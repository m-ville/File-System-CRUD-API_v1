# File-System-CRUD-API
- It's a file system api, which can do CRUD operations. 
- It's built on `REST` api architecture.
- Below is the description table.


|   Task       |     Method/HTTP Verb      |    Path/ Endpoint URL      |
| :---------   |     :--------------:      |     :---------------:      |
| 1. Upload a file ( as form data : `key=file` & value={filetobeuploaded} ) |POST |  `/files/upload`  |
| 2. Get list of all files                                                    | GET  |  `/files`        |
| 3. Download a file                                                          | GET  | `/files/download/{filename}`  |
| 4. Update a file  ( new file as form data )                                 | PUT  | `/files/update/{filename}`  |
| 5. Delete a file                                                            | DELETE | `/files/{filename}` |


## Demo/Usuge
> **1. Upload a file :**
![InkedFile System CRUD API - Uplaod a file_LI](https://user-images.githubusercontent.com/94619482/159142364-e5aa5309-6412-4f74-bdad-264b3739d130.jpg)

> **2. Downoad a file :**
![InkedFile System CRUD API - Download a file_LI](https://user-images.githubusercontent.com/94619482/159142370-b32b1d02-dd6a-4567-a17e-64a746d45296.jpg)

## Note 
1. File Size Limit is **10MB** .
2. In task 1, key must be named as **"file"** 
3. Don't forget to clear the form data(uncheck key-value pair) while doing task 2, 3, and 5.
4. In task 4, in `/files/update/{filename}`, **{filename}** is the name of file that is to be replaced with the new file.
