import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgTree } from 'ng.tree';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntityViewAboutContainerComponent } from './containers/entity-view-about-container/entity-view-about-container.component';
import { FileTreeComponent } from './components/file-tree/file-tree.component';
import { ScrollableComponent } from './components/scrollable/scrollable.component';
import { FileExplorerWithViewerComponent } from './components/file-explorer-with-viewer/file-explorer-with-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    NgTree,
    EntityViewAboutContainerComponent,
    FileTreeComponent,
    ScrollableComponent,
    FileExplorerWithViewerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
