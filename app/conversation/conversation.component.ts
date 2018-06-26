import {Component, OnInit} from "@angular/core";
import {PageRoute, RouterExtensions} from "nativescript-angular/router";
import {NgZone} from "@angular/core";
import {BindingOptions, Page} from "tns-core-modules/ui/page"
import {switchMap} from "rxjs/operators";
import {TextField} from "ui/text-field";
import {fromObject} from "tns-core-modules/data/observable";

@Component({
    selector: "Conversation",
    moduleId: module.id,
    templateUrl: "./conversation.component.html"
})


export class ConversationComponent implements OnInit {

    userID: any;
    messageBody: any = 'papa';
    messages: any[] = [
        {userID: 0, messageBody: "Hello!"},
        {userID: 1, messageBody: "Hello to you too!"},
        {userID: 0, messageBody: "Hello!"},
        {userID: 1, messageBody: "Hello to you too!"},
        {userID: 0, messageBody: "Hello!"},
        {userID: 1, messageBody: "Hello to you too!"},
        {userID: 0, messageBody: "Hello!"},
        {userID: 1, messageBody: "Hello to you too!"},
        {userID: 0, messageBody: "Hello!"},
        {userID: 1, messageBody: "Hello to you too!"},
        {userID: 0, messageBody: "Hello!"},
        {userID: 1, messageBody: "Hello to you too!"},
    ];

    source = fromObject({
        textSource: ""
    });

    constructor(private pageRoute: PageRoute, private _routerExtensions: RouterExtensions, private zone: NgZone, private page: Page) {
        this.pageRoute.activatedRoute.pipe(
            switchMap(activatedRoute => activatedRoute.params)
        ).forEach((params) => {
            this.userID = +params["userID"];
        });
    }

    ngOnInit() {
    }

    public sendMessage(text: string) {
        if (text) {
            this.messages.push({userID: this.userID, messageBody: text});
        }
    }

}
