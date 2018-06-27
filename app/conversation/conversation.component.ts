import {Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterViewChecked} from "@angular/core";
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


export class ConversationComponent implements AfterViewChecked {

    userID: any;
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
    @ViewChild("conversationContainer") scrollList: ElementRef;

    constructor(private pageRoute: PageRoute, private _routerExtensions: RouterExtensions, private zone: NgZone, private page: Page) {
        this.pageRoute.activatedRoute.pipe(
            switchMap(activatedRoute => activatedRoute.params)
        ).forEach((params) => {
            this.userID = +params["userID"];
        });
    }

    ngAfterViewChecked() {
        this.scrollDown();
    }

    public sendMessage(text: string) {
        if (text) {
            this.messages.push({userID: this.userID, messageBody: text});
            this.scrollDown();
        }
    }

    public scrollDown() {
        this.scrollList.nativeElement.scrollToVerticalOffset(this.scrollList.nativeElement.scrollableHeight, false)
    }

    public goBack() {
        this._routerExtensions.backToPreviousPage();
    }
}
