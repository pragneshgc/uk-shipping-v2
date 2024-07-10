## Version 1.4.3.7 - 04.07.2024

##### General

-   For client Focused in shipping send tracking data in JSON format

## Version 1.4.3.6 - 03.11.2023

##### Orders

-   Added network code for fridge product shipping to Northern Ireland.

## Version 1.4.3.5 - 31.10.2023

-   Fixed Download DPD labels as .zpl file.

## Version 1.4.3.4 - 26.10.2023

-   Link Azure storage for file storage and access.

## Version 1.4.3.3 - 03.10.2023

##### Invoice

-   Allow to generate invoice without return URL.

## Version 1.4.3.2 - 24.02.2023

##### General

-   Demo mode indicator is now configured in the backend

## Version 1.4.3.1 - 07.02.2023

##### General

-   Fixed minor user log related bugs
-   Logo change

## Version 1.4.3 - 01.02.2023

##### Royal Mail API

-   Royal Mail API update caused critical parameters not to be received by shipping app. Implemented a workaround that fetches the parameters via another RML API endpoint

## Version 1.4.2 - 12.01.2023

##### Authorization

-   Fixed a bug where the pharmacist related role was not assigned correctly

##### Orders

-   Added detailed order history logging

## Version 1.4.1 - 01.12.2022

##### Interface

-   Replaced the color scheme

## Version 1.4 - 01.12.2022

##### Authorization

-   Added new global login system for all esasys apps
-   Added unified user management for all esasys apps
-   Added a script to merge esasys, inventory and pxp users

## Version 1.3.5 - 08.11.2022

##### Orders

-   Modifications to Royal Mail API calls
-   Fixes for label printing

## Version 1.3.4 - 03.11.2022

##### Orders

-   Added API support for Royal Mail
-   Added label and document printing support for Royal Mail API
-   Added a notification banner if a Royal Mail order exceeds 270 GBP in value

##### General

-   Added different service code logic for Royal Mail, depending on the products being fridge products or not

## Version 1.3.3 - 02.06.2022

##### Orders

-   Added support for DPD saturday delivery

## Version 1.3.2 - 02.06.2022

##### API

-   Upgraded DHL API from 6.2 to 10.0

##### Login

-   Fixed issues with login timeouts throwing out a blank page

##### Clients

-   Added checks for client 53

## Version 1.3.1.7 - 23.08.2021

##### Orders

-   Added manufacturer country code for DHL shipments

## Version 1.3.1.6 - 21.06.2021

##### Authentication

-   Users can now only be logged in into 1 PC/Browser at the same time (applied to both username/password and code logins)

##### Orders

-   Fixed an issue where that caused the PDF prescription button to not appear in some cases

## Version 1.3.1.5 - 18.01.2021

##### Orders

-   Fixed a bug that caused request label to error out when no PDF was present

## Version 1.3.1.4 - 18.01.2021

##### Orders

-   Added a log for every time a Prescription PDF is sent to courrier

## Version 1.3.1.3 - 18.01.2021

##### Orders

-   Added resend button in the activity log in case a PDF send routine does not work

## Version 1.3.1.2 - 18.01.2021

##### Orders

-   Changes and additions to DHL API

## Version 1.3.1.1 - 31.12.2020

##### Orders

-   Fixed a minor value rounding error on DHL orders

## Version 1.3.1 - 31.12.2020

##### General

-   Added DHL paperless support
-   Modified UPS API duties tag
-   Temporarly disabled UPS label request
-   Added a commercial invoice download button in case one is generated
-   Removed the "THIS IS A CI ORDER" alert

## Version 1.3.0 - 10.12.2020

##### General

-   Styling changes
-   Added a banner to signify if the app is running in demo mode

##### Order

-   Implemented new Royal Mail csv template

##### Authorization

-   Added a toggle in user editing to turn users authorization privileges on or off

## Version 1.2.9 - 11.09.2020

##### Order

-   Added PXP specific activity logs
-   Added shipped confirmation activity for all orders
-   Modified the routine to wipe the customer email when order is shipped via API

##### General

-   Changed the input box styling

## Version 1.2.8 - 03.08.2020

-   Added a special UPS validation rule for Canary Islands

## Version 1.2.7 - 16.07.2020

-   Added a routine to wipe the customer email when an order is shipped

## Version 1.2.6 - 19.05.2020

##### Edit Address

-   Fixed an issue that possibly caused order edits not to be applied correctly
-   Fixed an issue where the UPS Access point was not shown correctly

## Version 1.2.5 - 02.04.2020

##### Dashboard

-   Added a counter for DHL, DPD, UPS, RML in "Awaiting Shipped" status

##### General

-   Added smaller notifications for minor errors

##### Order

-   UPS COD implementation
-   Fixed a long standing bug that might have caused "Duplicate UPS Label Prints"

##### Edit Address

-   Fields now show in 2 separate columns for better visibility
-   Fixed a bug where clicking on review would automatically save the edit
-   Added a back button on the review screen for easier editing
-   Use aliases instead of database column titles to match the first edit screen
-   Show country and delivery company titles instead of ID's

##### Code Login

-   Added a fix to prevent the browser offering autocomplete suggestions

## Version 1.2.4 - 26.03.2020

##### Order

-   Added both manual and api functionality for CI's
-   Fixed an issue where the product description would go over the API's 35 character limit
-   Added some frontend css fixes

## Version 1.2.3 - 25.03.2020

##### Order

-   Fixed a bug where the request buttons would not display correctly

## Version 1.2.2 - 24.03.2020

##### Order

-   UPS Paperless invoice implementation

## Version 1.2.1 - 20.03.2020

##### General

-   Backend optimizations and cleanup

## Version 1.2.0 - 20.03.2020

##### Order

-   Fixed issues with DPD API label print logging
-   Fixed issues with DPD API account numbers

## Version 1.1.9 - 19.03.2020

##### Order

-   Fixed labels sometimes throwing code as an error
-   Added DPD API support

## Version 1.1.8 - 13.03.2020

##### Edit Address

-   Added change review when editing order, with additional confirmation
-   Added backend checks if the correct order has been edited

##### Activities

-   All order editing will now be fully logged in activities

## Version 1.1.7 - 18.02.2020

##### Reports

-   Added capability to search for multiple orderIDs and reference Numbers like "500000, 500001"

##### Backend

-   Fixed tracking code formatting issue which might have caused import tracking failures

## Version 1.1.6 - 11.01.2020

##### Reports

-   Fixed reports load time

##### General

-   Backend fixes

## Version 1.1.5 - 10.01.2020

##### Reports

-   Fixed Reports time stamp
-   Fixed reports CSV download

## Version 1.1.4 - 09.01.2020

##### Code Confirmation

-   Checks if the users have an existing authorization code before allowing them to authorize a reprint

## Version 1.1.3 - 03.01.2020

##### Reports

-   Added activity reports

##### Orders

-   amp; formatting
-   Postcode formatting

## Version 1.1.2 - 19.12.2019

##### Info

-   Added changelog

## Version 1.1.1 - 18.12.2019

##### Users

-   Code login functionalities

##### Order

-   Additional code reprint confirmation

## Version 1.1.0 - 16.12.2019

##### Users

-   User management

##### Order

-   Added additional conditional checks for order statuses

## Version 1.0.3 - 29.11.2019

##### Order

-   EveAdam id fix

## Version 1.0.2 - 19.09.2019

##### Dashboard

-   Order statuses refresh fixes

##### General

-   Minor backend fixes

## Version 1.0.1 - 19.07.2019

##### Order

-   Shipment validation fix

## Version 1.0.0 - 28.05.2019

##### General

-   First version
