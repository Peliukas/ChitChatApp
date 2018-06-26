import {Component, ElementRef, NgZone, OnInit} from "@angular/core";
import {Button} from "ui/button";
import {Kinvey, User} from 'kinvey-nativescript-sdk';
import {RouterExtensions} from "nativescript-angular/router";
import {Page} from "tns-core-modules/ui/page"
import {EventData} from "data/observable";
import {StackLayout} from "ui/layouts/stack-layout";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    public loggedUser: string;
    public contactList: any[];


    constructor(private _routerExtensions: RouterExtensions, private zone: NgZone, private page: Page) {
        this.page.actionBarHidden = false;
        this.contactList = [
            {
                id: 0,
                userName: 'mister twister'
            },
            {
                id: 1,
                userName: 'broski swarowski'
            },
            {
                id: 2,
                userName: 'dog bulldog'
            },
            {
                id: 3,
                userName: 'merry cherry'
            }
        ];
    }

    ngOnInit(): void {
        Kinvey.User.me()
            .then((user: User) => {
                this.loggedUser = user.data['_socialIdentity'].kinveyAuth.id
            });
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

    onMenuButtonTap(args: EventData) {
        // Navigate to corresponding page
        const menuButtonParent = (<StackLayout>args.object).parent;
        alert("Navigate to " + menuButtonParent.get("data-name"));
    }

    onProfileButtonTap() {
        // Navigate to profile page here
        alert("Navigate to profile page");
    }

    public startConversation(userName: string) {
        this.zone.run(() => {
            this._routerExtensions.navigate(["conversation", userName], {
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
