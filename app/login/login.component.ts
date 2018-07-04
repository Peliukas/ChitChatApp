import {Component} from "@angular/core";
import {RouterExtensions} from "nativescript-angular/router";
import {NgZone} from "@angular/core";
import {Page} from "tns-core-modules/ui/page"

const httpModule = require("http");
import 'rxjs/add/operator/map';
import User from "~/shared/User";

var applicationSettings = require("application-settings");

@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: "./login.component.html"
})
export class LoginComponent {

    baseUrl = "https://cf1fc6b1.ngrok.io";

    constructor(private _routerExtensions: RouterExtensions, private zone: NgZone, private page: Page) {
        this.page.actionBarHidden = true;
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.className = "page-login-container";
        this.page.statusBarStyle = "dark";
    }

    public login(email: string, pass: string) {
        httpModule.request({
            url: this.baseUrl + "/login",
            method: "POST",
            headers: {"Content-Type": "application/json"},
            content: JSON.stringify({
                email: email, password: pass
            })
        }).then(response => {
            console.log("USER_id: ", response.content.toJSON()._id);
            if (response.content.toJSON().token) {
                applicationSettings.setString('baseUrl', this.baseUrl);
                applicationSettings.setString('user_id', response.content.toJSON()._id);
                applicationSettings.setString('user_name', response.content.toJSON().username);
                applicationSettings.setString('user_token', response.content.toJSON().token);
                this.navigateHome();
            }
        });
    }

    private navigateHome() {
        this.zone.run(() => {
            this._routerExtensions.navigate(["home"], {
                clearHistory: true,
                animated: true,
                transition: {
                    name: "slideTop",
                    duration: 350,
                    curve: "ease"
                }
            });
        });
    }
}
