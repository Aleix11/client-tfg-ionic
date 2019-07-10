import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './start/start.module#StartPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'register-wallet', loadChildren: './register-wallet/register-wallet.module#RegisterWalletPageModule' },
  { path: 'chat-list', loadChildren: './chat-list/chat-list.module#ChatListPageModule' },
  { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule' },
  ];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
