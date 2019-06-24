import {Component, Input, OnInit} from '@angular/core';
import {
    AlertController, LoadingController, ModalController, NavController, Platform,
    ToastController
} from "@ionic/angular";
import {User} from "../../../models/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Crop } from '@ionic-native/crop/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {Base64} from '@ionic-native/base64/ngx';
import {DomSanitizer} from "@angular/platform-browser";
import { Storage } from '@ionic/storage';
import {UserService} from "../../../providers/userService";

@Component({
  selector: 'app-modal-edit-user',
  templateUrl: './modal-edit-user.page.html',
  styleUrls: ['./modal-edit-user.page.scss'],
})
export class ModalEditUserPage implements OnInit {

  @Input() user: User;

    cameraOptions: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        cameraDirection: 1,
        targetWidth: 1000,
        targetHeight: 1000
    };

    // destinationType: this.platform.is('ios') ? this.camera.DestinationType.FILE_URI : this.camera.DestinationType.DATA_URL,

    galleryOptions: CameraOptions = {
        quality: 100,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        targetHeight: 1000,
        targetWidth: 1000,
        correctOrientation: true,
        saveToPhotoAlbum: true
    };

    private loading: any;

    //user: User = new User();
    savedUser: User = new User();

    public editUserForm: FormGroup;

    validation_messages = {
        'email': [
            {type: 'required', message: 'Email is required.'},
            {type: 'pattern', message: 'Email is not valid.'}
        ],
    };


  constructor(private modalCtrl: ModalController,
          private camera: Camera,
          private platform: Platform,
          private crop: Crop,
          public formBuilder: FormBuilder,
          public alertController: AlertController,
          private base64: Base64,
          private sanitizer: DomSanitizer,
          private nav: NavController,
          private loadCtrl: LoadingController,
          private storage: Storage,
          public userService: UserService,
          public toastController: ToastController) {

    this.editUserForm = formBuilder.group({
        email: ['', Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])]
    });
  }

  ngOnInit() {
    console.log(this.user);
    if(this.user && (!this.user.profilePhoto || this.user.profilePhoto === null)) {
        this.user.profilePhoto = "data:image/png;base64,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"
    }
  }

  async closeModal() {
    const modal = await this.modalCtrl.getTop();
    modal.dismiss();
  }

    async changePhoto() {
        if(this.platform.is('ios')) {
            const toast = await this.toastController.create({
                message: 'Future functionality for Ios',
                duration: 2000,
                showCloseButton: true,
                color: 'dark'
            });
            toast.present();
        } else {
            const alert = await this.alertController.create({
                header: 'Change profile photo from:',cssClass: 'black',
                buttons: [
                    {
                        text: 'Camera',cssClass: 'black',
                        handler: () => {
                            this.Camera();
                        }
                    }, {
                        text: 'Gallery',cssClass: 'black',
                        handler: () => {
                            this.Library();
                        }
                    }
                ]
            });
            await alert.present();
        }
    }
    Camera() {
        this.camera.getPicture(this.cameraOptions).then((imageData) => {
            this.cropImage(imageData);
        }, (err) => {
            console.log(err);
        })
    }

    Library() {
        this.camera.getPicture(this.galleryOptions).then((imageData) => {
            this.cropImage(imageData);
        }, (err) => {
            console.log(err);
        })
    }


    cropImage(image) {
        console.log('image 1 ', image, this.platform.is('ios'));
        if (this.platform.is('ios')) {
            image = image.substring(7, image.length);
            console.log('image 2 ', image, this.platform.is('ios'));
            this.crop.crop(image, {quality: 80}).then(async path => {
                let fileName = path.substring(7, path.length);
                console.log('test', path);

                /*File.readAsDataURL(dirPath, fileName).then(imageBase64 => {
                    console.log('first', imageBase64, 'file://'+this.player.profilePhoto);
                    if(this.player && this.player !== null) {
                        this.player.profilePhoto = imageBase64;
                        console.log('ieep', imageBase64, this.player.profilePhoto);
                    } else if(this.coach && this.coach !== null) {
                        this.coach.profilePhoto = imageBase64;
                    }

                    let image = imageBase64;
                    let size = (imageBase64.length * 6 / 8 / 1024).toFixed(4);
                });*/
                this.base64.encodeFile(path).then(async (imageBase64: string) => {
                    console.log('hola', imageBase64);
                    if(this.user && this.user !== null) {
                        this.user.profilePhoto = imageBase64;
                    }
                    const toast = await this.toastController.create({
                        message: 'Remember to save your changes',
                        duration: 2000,
                        showCloseButton: true,
                        color: 'dark'
                    });
                    toast.present();
                }, async (err) => {
                    console.log(err);
                    const toast = await this.toastController.create({
                        message: 'An error occur',
                        duration: 2000,
                        showCloseButton: true,
                        color: 'dark'
                    });
                    toast.present();
                });

            }, error => console.log('error', error));
        } else {
            this.crop.crop("file://"+image, {quality: 80}).then(path => {
                let dirPath = path.substring(0, path.lastIndexOf('/') + 1);
                let fileName = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('?'));
                /*File.readAsDataURL(dirPath, fileName).then(imageBase64 => {
                    if(this.player && this.player !== null) {
                        this.player.profilePhoto = imageBase64;
                    } else if(this.coach && this.coach !== null) {
                        this.coach.profilePhoto = imageBase64;
                    }

                    let image = imageBase64;
                    let size = (imageBase64.length * 6 / 8 / 1024).toFixed(4);
                });*/

                this.base64.encodeFile(path).then(async (imageBase64: string) => {
                    if(this.user && this.user !== null) {
                        this.user.profilePhoto = imageBase64;
                    }
                    const toast = await this.toastController.create({
                        message: 'Remember to save your changes',
                        duration: 2000,
                        showCloseButton: true,
                        color: 'dark'
                    });
                    toast.present();
                }, async (err) => {
                    console.log(err);
                    const toast = await this.toastController.create({
                        message: 'An error occur',
                        duration: 2000,
                        showCloseButton: true,
                        color: 'dark'
                    });
                    toast.present();
                });
            })
        }


    }

    async editUser() {
        this.presentLoading();
        if (this.editUserForm.valid) {
            this.storage.get('token').then(tkn => {
                this.userService.editUser(this.user, tkn).subscribe(async usr => {
                    this.user = usr;
                    this.storage.set('user', this.user);
                    setTimeout(()=> {
                        this.dismissLoading();
                    }, 500);
                    const toast = await this.toastController.create({
                        message: 'User Edited',
                        duration: 2000,
                        showCloseButton: true,
                        color: 'dark'
                    });
                    toast.present();

                    const modal = await this.modalCtrl.getTop();
                    modal.dismiss();
                }, async error => {
                    this.user = Object.assign({}, this.savedUser);
                    setTimeout(()=> {
                        this.dismissLoading();
                    }, 500);
                    const toast = await this.toastController.create({
                        message: error.error.message,
                        duration: 2000,
                        showCloseButton: true,
                        color: 'dark'
                    });
                    toast.present();

                });
            })
        } else {
            setTimeout(()=> {
                this.dismissLoading();
            }, 500);
            const toast = await this.toastController.create({
                message: 'Fix the errors',
                duration: 2000,
                showCloseButton: true,
                color: 'dark'
            });
            toast.present();
        }
    }

    private async presentLoading() {
        this.loading = await this.loadCtrl.create({cssClass: 'loading'});
        this.loading.present();
    }
    private dismissLoading() {
        this.loading.dismiss();
    }

}
