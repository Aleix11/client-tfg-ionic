import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: '../tab1/tab1.module#Tab1PageModule'
          },
            { path: 'createBet', loadChildren: './../create-bet/create-bet.module#CreateBetPageModule'},
            { path: 'bet/:id', loadChildren: './../bet/bet.module#BetPageModule' },

        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: '../tab2/tab2.module#Tab2PageModule'
          },
            { path: 'add-account', loadChildren: './../add-account/add-account.module#AddAccountPageModule' },

        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: '../tab3/tab3.module#Tab3PageModule'
          },
            { path: 'bet/:id', loadChildren: './../bet/bet.module#BetPageModule' },
        ]
      },
      {
          path: 'tab4',
          children: [
              {
                  path: '',
                  loadChildren: '../tab4/tab4.module#Tab4PageModule'
              }
          ]
      },
      {
          path: 'tab5',
          children: [
              {
                  path: '',
                  loadChildren: '../tab5/tab5.module#Tab5PageModule'
              },
              { path: 'bet/:id', loadChildren: './../bet/bet.module#BetPageModule' },
          ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
