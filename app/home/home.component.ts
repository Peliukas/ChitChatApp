import {Component, NgZone, OnInit} from "@angular/core";
import {Kinvey, User} from 'kinvey-nativescript-sdk';
import {RouterExtensions} from "nativescript-angular/router";
import {Page} from "tns-core-modules/ui/page"
import {TextField} from "tns-core-modules/ui/text-field";

const httpModule = require("http");
var applicationSettings = require("application-settings");

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    contactList: any[];
    foundUsers: any[];
    showContactSearchBar: boolean = false;
    userName: string;

    constructor(private _routerExtensions: RouterExtensions, private zone: NgZone, private page: Page) {
        this.page.actionBarHidden = false;
    }

    ngOnInit(): void {
        if (applicationSettings.getString('user_name')) {
            this.userName = applicationSettings.getString('user_name');
            this.getContactList();
        }
    }

    logout() {
        Kinvey.User.logout()
            .then(() => {
                this._routerExtensions.navigate(["login"],
                    {
                        clearHistory: true,
                        animated: true,
                        transition: {
                            name: "slideBottom",
                            duration: 350,
                            curve: "ease"
                        }
                    });
            });
    }

    private getContactList() {
        httpModule.request({
            url: applicationSettings.getString('baseUrl') + "/contact-list",
            method: "GET",
            headers: {"Authorization": applicationSettings.getString('user_token')}
        }).then(response => {
            if (response.content.toJSON().length > 0) {
                this.contactList = response.content.toJSON();
            } else {
                this.contactList = [];
            }
        });
    }

    public searchForUser(event: any) {
        httpModule.request({
            url: applicationSettings.getString('baseUrl') + "/find/" + <TextField>event.object.text,
            method: "GET",
            headers: {"Authorization": applicationSettings.getString('user_token')}
        }).then(response => {
            if (response.content.toJSON().length > 0) {
                this.foundUsers = response.content.toJSON();
                console.log("FOUND: ", this.foundUsers);
            } else {
                this.foundUsers = [];
            }
        });
    }

    public startConversation(userName: string) {
        this.zone.run(() => {
            this._routerExtensions.navigate(["conversation", userName], {
                clearHistory: false,
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
