import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { CapteursComponent } from './views/capteurs/capteurs.component';
import { LoginComponent } from './views/login/login.component';
import { CourbejournaliereComponent } from './views/courbejournaliere/courbejournaliere.component';
import { HistogrammesComponent } from './views/histogrammes/histogrammes.component';
import { DatePickerWeekComponent } from './shared/date-picker-week/date-picker-week.component';
import { WeekGraphComponent } from './shared/week-graph/week-graph.component';
import { MesuresComponent } from './views/mesures/mesures.component';
import { CartechaleurComponent } from './views/cartechaleur/cartechaleur.component';
import { HtmlViewerComponent } from './views/html-viewer/html-viewer.component';
import { TraficmoyenjournalierComponent } from './views/traficmoyenjournalier/traficmoyenjournalier.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent,
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'courbejournaliere',
                component: CourbejournaliereComponent
            },
            {

                path: 'histogramme',
                component: HistogrammesComponent
            },
            {

                path: 'mesures',
                component: MesuresComponent
            },
            {
                path: 'cartechaleur',
                component: CartechaleurComponent
            },
            {
                path: 'traficjournalier',
                component: TraficmoyenjournalierComponent
            }, 
            {
                path: 'capteurs',
                component: CapteursComponent
            }
        ]
    },
    { path: 'html-viewer', component: HtmlViewerComponent }
];
