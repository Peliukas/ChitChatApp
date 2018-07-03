import {NgModule} from "@angular/core";
import {Routes} from "@angular/router";
import {NativeScriptRouterModule} from "nativescript-angular/router";
import {LoggedInLazyLoadGuard} from "./logged-in-lazy-load.guard";
import {Http} from "@angular/http";

const routes: Routes = [
    {path: "", redirectTo: "/home", pathMatch: "full"},
    {path: "login", loadChildren: "./login/login.module#LoginModule"},
    {path: "conversation/:userID", loadChildren: "./conversation/conversation.module#ConversationModule"},
    {path: "home", loadChildren: "./home/home.module#HomeModule", canLoad: [LoggedInLazyLoadGuard]}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule],
    providers: [Http]
})
export class AppRoutingModule {
}
