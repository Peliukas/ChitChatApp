import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptCommonModule} from "nativescript-angular/common";

import {ConversationRoutingModule} from "./conversation-routing.module";
import {ConversationComponent} from "./conversation.component";
import {TNSFontIconModule, TNSFontIconService} from "nativescript-ngx-fonticon";

TNSFontIconService.debug = true;
@NgModule({

    imports: [
        NativeScriptCommonModule,
        ConversationRoutingModule,
        TNSFontIconModule.forRoot({
            'fa': '../assets/fontawesome.css',
        })
    ],
    declarations: [
        ConversationComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ConversationModule {
}
