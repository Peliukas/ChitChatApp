import {Component, Input, OnInit} from "@angular/core";
import {RouterExtensions} from "nativescript-angular/router";
import {NgZone} from "@angular/core";
import {Page} from "tns-core-modules/ui/page"

@Component({
    selector: "Conversation",
    moduleId: module.id,
    templateUrl: "./conversation.component.html"
})


export class ConversationComponent implements OnInit {

    // @Input() userID: number;
    @Input() userName: string;

    constructor(private _routerExtensions: RouterExtensions, private zone: NgZone, private page: Page) {
    }

    ngOnInit() {
    }

}
