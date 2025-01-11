"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var loading_interceptor_1 = require("./loading.interceptor");
var auth_interceptor_interceptor_1 = require("./services/Auth/AuthInterceptor/auth-interceptor.interceptor");
var app_routing_module_1 = require("@/app-routing.module");
var app_component_1 = require("./app.component");
var main_component_1 = require("@modules/main/main.component");
var login_component_1 = require("@modules/login/login.component");
var header_component_1 = require("@modules/main/header/header.component");
var footer_component_1 = require("@modules/main/footer/footer.component");
var menu_sidebar_component_1 = require("@modules/main/menu-sidebar/menu-sidebar.component");
var forms_1 = require("@angular/forms");
var animations_1 = require("@angular/platform-browser/animations");
var dashboard_component_1 = require("@pages/dashboard/dashboard.component");
var ngx_toastr_1 = require("ngx-toastr");
var messages_component_1 = require("@modules/main/header/messages/messages.component");
var notifications_component_1 = require("@modules/main/header/notifications/notifications.component");
var forms_2 = require("@angular/forms");
var common_1 = require("@angular/common");
var en_1 = require("@angular/common/locales/en");
var user_component_1 = require("@modules/main/header/user/user.component");
var language_component_1 = require("@modules/main/header/language/language.component");
var main_menu_component_1 = require("./pages/main-menu/main-menu.component");
var sub_menu_component_1 = require("./pages/main-menu/sub-menu/sub-menu.component");
var menu_item_component_1 = require("./components/menu-item/menu-item.component");
var control_sidebar_component_1 = require("./modules/main/control-sidebar/control-sidebar.component");
var store_1 = require("@ngrx/store");
var reducer_1 = require("./store/auth/reducer");
var reducer_2 = require("./store/ui/reducer");
var angular_components_1 = require("@profabric/angular-components");
var sidebar_search_component_1 = require("./components/sidebar-search/sidebar-search.component");
var chartjs_component_1 = require("@pages/dashboard/chartjs/chartjs.component");
var admin_component_1 = require("./pages/admin/admin.component");
var settings_component_1 = require("./pages/settings/settings.component");
var products_component_1 = require("./pages/products/products.component");
var clients_component_1 = require("./pages/clients/clients.component");
var users_component_1 = require("./pages/users/users.component");
var add_client_modal_component_1 = require("./components/add-client-modal/add-client-modal.component");
var documments_listing_component_1 = require("./components/documments-listing/documments-listing.component");
// Import PrimeNG modules
var accordion_1 = require("primeng/accordion");
var autocomplete_1 = require("primeng/autocomplete");
var avatar_1 = require("primeng/avatar");
var avatargroup_1 = require("primeng/avatargroup");
var badge_1 = require("primeng/badge");
var breadcrumb_1 = require("primeng/breadcrumb");
var button_1 = require("primeng/button");
var calendar_1 = require("primeng/calendar");
var carousel_1 = require("primeng/carousel");
var cascadeselect_1 = require("primeng/cascadeselect");
var chart_1 = require("primeng/chart");
var checkbox_1 = require("primeng/checkbox");
var chip_1 = require("primeng/chip");
var chips_1 = require("primeng/chips");
var confirmdialog_1 = require("primeng/confirmdialog");
var colorpicker_1 = require("primeng/colorpicker");
var contextmenu_1 = require("primeng/contextmenu");
var dataview_1 = require("primeng/dataview");
var virtualscroller_1 = require("primeng/virtualscroller");
var dialog_1 = require("primeng/dialog");
var divider_1 = require("primeng/divider");
var dock_1 = require("primeng/dock");
var dragdrop_1 = require("primeng/dragdrop");
var dropdown_1 = require("primeng/dropdown");
var dynamicdialog_1 = require("primeng/dynamicdialog");
var fieldset_1 = require("primeng/fieldset");
var fileupload_1 = require("primeng/fileupload");
var galleria_1 = require("primeng/galleria");
var inplace_1 = require("primeng/inplace");
var inputmask_1 = require("primeng/inputmask");
var inputswitch_1 = require("primeng/inputswitch");
var inputtext_1 = require("primeng/inputtext");
var inputnumber_1 = require("primeng/inputnumber");
var inputtextarea_1 = require("primeng/inputtextarea");
var image_1 = require("primeng/image");
var knob_1 = require("primeng/knob");
var listbox_1 = require("primeng/listbox");
var megamenu_1 = require("primeng/megamenu");
var menu_1 = require("primeng/menu");
var menubar_1 = require("primeng/menubar");
var message_1 = require("primeng/message");
var messages_1 = require("primeng/messages");
var multiselect_1 = require("primeng/multiselect");
var orderlist_1 = require("primeng/orderlist");
var organizationchart_1 = require("primeng/organizationchart");
var overlaypanel_1 = require("primeng/overlaypanel");
var paginator_1 = require("primeng/paginator");
var panel_1 = require("primeng/panel");
var panelmenu_1 = require("primeng/panelmenu");
var password_1 = require("primeng/password");
var picklist_1 = require("primeng/picklist");
var progressbar_1 = require("primeng/progressbar");
var radiobutton_1 = require("primeng/radiobutton");
var rating_1 = require("primeng/rating");
var scroller_1 = require("primeng/scroller");
var scrollpanel_1 = require("primeng/scrollpanel");
var scrolltop_1 = require("primeng/scrolltop");
var selectbutton_1 = require("primeng/selectbutton");
var sidebar_1 = require("primeng/sidebar");
var skeleton_1 = require("primeng/skeleton");
var slidemenu_1 = require("primeng/slidemenu");
var slider_1 = require("primeng/slider");
var speeddial_1 = require("primeng/speeddial");
var spinner_1 = require("primeng/spinner");
var splitbutton_1 = require("primeng/splitbutton");
var splitter_1 = require("primeng/splitter");
var steps_1 = require("primeng/steps");
var tabmenu_1 = require("primeng/tabmenu");
var table_1 = require("primeng/table");
var tabview_1 = require("primeng/tabview");
var tag_1 = require("primeng/tag");
var terminal_1 = require("primeng/terminal");
var tieredmenu_1 = require("primeng/tieredmenu");
var timeline_1 = require("primeng/timeline");
var toast_1 = require("primeng/toast");
var togglebutton_1 = require("primeng/togglebutton");
var toolbar_1 = require("primeng/toolbar");
var tooltip_1 = require("primeng/tooltip");
var tristatecheckbox_1 = require("primeng/tristatecheckbox");
var tree_1 = require("primeng/tree");
var treeselect_1 = require("primeng/treeselect");
var treetable_1 = require("primeng/treetable");
var animate_1 = require("primeng/animate");
var card_1 = require("primeng/card");
var blockui_1 = require("primeng/blockui");
var progressspinner_1 = require("primeng/progressspinner");
var edit_document_component_1 = require("./pages/edit-document/edit-document/edit-document.component");
var angular_jwt_1 = require("@auth0/angular-jwt");
var logout_component_1 = require("./modules/logout/logout/logout.component");
var create_document_component_1 = require("./pages/create-document/create-document/create-document.component");
var create_billing_form_component_1 = require("./pages/create-document/create-billing-form/create-billing-form.component");
var create_document_table_items_component_1 = require("./pages/create-document/create-document-table-items/create-document-table-items.component");
var loading_component_1 = require("./components/loading/loading/loading.component");
var delete_item_component_1 = require("./components/delete/delete-item/delete-item.component");
var api_1 = require("primeng/api");
var edit_billing_form_component_1 = require("./pages/edit-document/edit-billing-form/edit-billing-form.component");
var edit_document_table_items_component_1 = require("./pages/edit-document/edit-document-table-items/edit-document-table-items.component");
var edit_client_modal_component_1 = require("./components/edit-client-modal/edit-client-modal.component");
common_1.registerLocaleData(en_1["default"], 'en-EN');
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                main_component_1.MainComponent,
                header_component_1.HeaderComponent,
                footer_component_1.FooterComponent,
                menu_sidebar_component_1.MenuSidebarComponent,
                dashboard_component_1.DashboardComponent,
                messages_component_1.MessagesComponent,
                notifications_component_1.NotificationsComponent,
                user_component_1.UserComponent,
                language_component_1.LanguageComponent,
                main_menu_component_1.MainMenuComponent,
                sub_menu_component_1.SubMenuComponent,
                menu_item_component_1.MenuItemComponent,
                control_sidebar_component_1.ControlSidebarComponent,
                sidebar_search_component_1.SidebarSearchComponent,
                chartjs_component_1.ChartjsComponent,
                admin_component_1.AdminComponent,
                products_component_1.ProductsComponent,
                clients_component_1.ClientsComponent,
                users_component_1.UsersComponent,
                settings_component_1.SettingsComponent,
                add_client_modal_component_1.AddClientModalComponent,
                documments_listing_component_1.DocummentsListingComponent,
                edit_document_component_1.EditDocumentComponent,
                login_component_1.LoginComponent,
                logout_component_1.LogoutComponent,
                create_document_component_1.CreateDocumentComponent,
                create_billing_form_component_1.CreateBillingFormComponent,
                create_document_table_items_component_1.CreateDocumentTableItemsComponent,
                loading_component_1.LoadingComponent,
                delete_item_component_1.DeleteItemComponent,
                edit_billing_form_component_1.EditBillingFormComponent,
                edit_document_table_items_component_1.EditDocumentTableItemsComponent,
                edit_client_modal_component_1.EditClientModalComponent
            ],
            imports: [
                avatar_1.AvatarModule,
                avatargroup_1.AvatarGroupModule,
                platform_browser_1.BrowserModule,
                forms_2.FormsModule,
                http_1.HttpClientModule,
                forms_1.ReactiveFormsModule,
                animations_1.BrowserAnimationsModule,
                accordion_1.AccordionModule,
                autocomplete_1.AutoCompleteModule,
                badge_1.BadgeModule,
                breadcrumb_1.BreadcrumbModule,
                blockui_1.BlockUIModule,
                button_1.ButtonModule,
                calendar_1.CalendarModule,
                carousel_1.CarouselModule,
                cascadeselect_1.CascadeSelectModule,
                chart_1.ChartModule,
                checkbox_1.CheckboxModule,
                chips_1.ChipsModule,
                chip_1.ChipModule,
                colorpicker_1.ColorPickerModule,
                confirmdialog_1.ConfirmDialogModule,
                contextmenu_1.ContextMenuModule,
                virtualscroller_1.VirtualScrollerModule,
                dataview_1.DataViewModule,
                dialog_1.DialogModule,
                divider_1.DividerModule,
                dock_1.DockModule,
                dragdrop_1.DragDropModule,
                dropdown_1.DropdownModule,
                dynamicdialog_1.DynamicDialogModule,
                fieldset_1.FieldsetModule,
                fileupload_1.FileUploadModule,
                galleria_1.GalleriaModule,
                inplace_1.InplaceModule,
                inputmask_1.InputMaskModule,
                inputswitch_1.InputSwitchModule,
                inputtext_1.InputTextModule,
                inputtextarea_1.InputTextareaModule,
                inputnumber_1.InputNumberModule,
                image_1.ImageModule,
                knob_1.KnobModule,
                listbox_1.ListboxModule,
                megamenu_1.MegaMenuModule,
                menu_1.MenuModule,
                menubar_1.MenubarModule,
                message_1.MessageModule,
                messages_1.MessagesModule,
                multiselect_1.MultiSelectModule,
                organizationchart_1.OrganizationChartModule,
                orderlist_1.OrderListModule,
                overlaypanel_1.OverlayPanelModule,
                paginator_1.PaginatorModule,
                panel_1.PanelModule,
                panelmenu_1.PanelMenuModule,
                password_1.PasswordModule,
                picklist_1.PickListModule,
                progressspinner_1.ProgressSpinnerModule,
                progressbar_1.ProgressBarModule,
                radiobutton_1.RadioButtonModule,
                rating_1.RatingModule,
                selectbutton_1.SelectButtonModule,
                sidebar_1.SidebarModule,
                scroller_1.ScrollerModule,
                scrollpanel_1.ScrollPanelModule,
                scrolltop_1.ScrollTopModule,
                skeleton_1.SkeletonModule,
                slidemenu_1.SlideMenuModule,
                slider_1.SliderModule,
                speeddial_1.SpeedDialModule,
                spinner_1.SpinnerModule,
                splitter_1.SplitterModule,
                splitbutton_1.SplitButtonModule,
                steps_1.StepsModule,
                table_1.TableModule,
                tabmenu_1.TabMenuModule,
                tabview_1.TabViewModule,
                tag_1.TagModule,
                terminal_1.TerminalModule,
                tieredmenu_1.TieredMenuModule,
                timeline_1.TimelineModule,
                toast_1.ToastModule,
                togglebutton_1.ToggleButtonModule,
                toolbar_1.ToolbarModule,
                tooltip_1.TooltipModule,
                tristatecheckbox_1.TriStateCheckboxModule,
                tree_1.TreeModule,
                treeselect_1.TreeSelectModule,
                treetable_1.TreeTableModule,
                animate_1.AnimateModule,
                card_1.CardModule,
                angular_components_1.ProfabricComponentsModule,
                common_1.CommonModule,
                platform_browser_1.BrowserModule,
                store_1.StoreModule.forRoot({ auth: reducer_1.authReducer, ui: reducer_2.uiReducer }),
                http_1.HttpClientModule,
                forms_2.FormsModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.ReactiveFormsModule,
                ngx_toastr_1.ToastrModule.forRoot({
                    timeOut: 3000,
                    positionClass: 'toast-top-right',
                    preventDuplicates: true
                }),
                angular_jwt_1.JwtModule.forRoot({
                    config: {
                        tokenGetter: function () {
                            return localStorage.getItem('token');
                        }
                    }
                }),
            ],
            providers: [
                {
                    provide: http_1.HTTP_INTERCEPTORS, useClass: loading_interceptor_1.LoadingInterceptor, multi: true
                },
                api_1.ConfirmationService,
                api_1.MessageService,
                {
                    provide: http_1.HTTP_INTERCEPTORS, useClass: auth_interceptor_interceptor_1.AuthInterceptorInterceptor, multi: true
                }
            ],
            bootstrap: [app_component_1.AppComponent, documments_listing_component_1.DocummentsListingComponent,]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
