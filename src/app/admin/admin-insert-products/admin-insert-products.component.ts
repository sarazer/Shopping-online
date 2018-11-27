import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Http } from '@angular/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Params } from '@angular/router';
declare var $: any;

@Component({
  selector: 'admin-insert-products',
  templateUrl: './admin-insert-products.component.html',
  styleUrls: ['./admin-insert-products.component.css']
})
export class AdminInsertProductsComponent implements OnInit {

  constructor(private dataService: DataService, private http: Http, private route: ActivatedRoute) {
    this.filesToUpload = [];
  }
  editMode = false;


  urlUploading = environment.backendUrl;

  status = 0;
  catalogNumber: '';
  product: any = {};
  categories: any = [];
  matchingCategory: any = {};
  filesToUpload: Array<File>;
  image: any = '';


  changeFile(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;

    if (this.filesToUpload && this.filesToUpload[0]) {
      var reader = new FileReader();

      reader.onload = (e: any) => {
        this.product.image = e.target.result;
        this.image = '';
      };

      reader.readAsDataURL(this.filesToUpload[0]);
    }
    else {
      this.product.image = '';
    }
  }

  changeImage(url) {
    this.image = url;
    const uploadInput = $('#imageUpload');
    uploadInput.wrap('<form>').closest('form').get(0).reset();
    uploadInput.unwrap();
    this.filesToUpload = [];
    this.product.image = url;
  }

  makeFileRequest(url: string, files: Array<File>, callback) {
    const imageFile = files[0];
    this.status = 1;
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      formData.append("image", imageFile, imageFile.name);
      this.http.post(url, formData).subscribe(
        res => callback(res.json()),
        err => callback(null, err)
      );

    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['product_id']) {
        this.product.product_id = params['product_id'];
        this.dataService.getProduct(this.product.product_id).subscribe(
          data => {
            const productDetails = data.json().product;
            this.catalogNumber = productDetails.product_id;
            this.product = productDetails;
            this.image = productDetails.image;
            data.json().categories.forEach(product => {
              this.matchingCategory[product.category] = true;
            })
          }
        )
        this.editMode = true;
      } else {
        this.editMode = false;
      }

    }
    )
    this.dataService.getCategories().subscribe(
      categories => {
        this.categories = categories.json();
        $(document).ready(() => {
          $('.ui.checkbox').checkbox();
        });
      },
      err => window.location.href = '/login'
    );
  }

  insertProduct() {
    this.matchingCategory = {};
    this.product = {};
    this.status = 0;
    $(document).ready(() => {
      $('.ui.checkbox').checkbox();
      this.changeImage('');
    });
  }

  sendForm() {
    if (this.filesToUpload.length) {
      this.makeFileRequest(this.urlUploading + 'uploadFile', this.filesToUpload, (image, errUploading) => {
        if (image) {
          this.product.image = 'images/' + image;

          this.saveNewProduct();
        }
        else {
          this.status = 3;
        }
      });
    } else {
      this.saveNewProduct()
    }
  }

  saveNewProduct() {
    this.status = 1;
    if (this.editMode) {
      this.dataService.editProduct({ product: this.product, categories: this.matchingCategory }, this.catalogNumber).subscribe(
        res => {
          if (res.json().success) {
            this.status = 2;
          } else {
            this.status = 3;
          }
        },
        err => {
          if (err.status == 401) { window.location.href = '/login'; return; }
          this.status = 3;
        }
      )
    } else {
      this.dataService.createProduct({ product: this.product, categories: this.matchingCategory }).subscribe(
        res => {
          if (res.json().success) {
            this.status = 2;
          } else {
            this.status = 3;
          }
        },
        err => {
          if (err.status == 401) { window.location.href = '/login'; return; }
          this.status = 3;
        }
      )
    }
  }

  tryAgain() {
    this.status = 0;
    $(document).ready(() => {
      $('.ui.checkbox').checkbox();
    });
  }

  validate() {
    if (
      this.product.product_id &&
      this.product.product_name &&
      this.product.price &&
      (this.product.image || this.filesToUpload.length)
    ) {
      return true;
    }
    return false;
  }

}

