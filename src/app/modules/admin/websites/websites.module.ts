import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { WebsiteCreateComponent } from './create/create.component';
import { WebsiteListComponent } from './list/list.component';
import { WebsiteSingleComponent } from './single/single.component';
import { WebsitesComponent } from './websites.component';

const websitesRoutes: Route[] = [
  {
    path: '',
    component: WebsitesComponent,
    children : [
      {
          path     : '',
          pathMatch: 'full',
          component: WebsiteListComponent,
          // resolve  : {
          //     websites: AcademyCoursesResolver
          // }
      },
      {
          path     : ':id',
          component: WebsiteSingleComponent,
          // resolve  : {
          //     website: AcademyCourseResolver
          // }
      },

      {
        path     : 'create',
        component: WebsiteCreateComponent,
        // resolve  : {
        //     plans: AcademyCourseResolver
        // }
    }
  ]
  },
];

@NgModule({
  declarations: [WebsitesComponent],
  imports: [
    RouterModule.forChild(websitesRoutes),
  ],
})
export class WebsitesModule {}
