### Backend Documentation for Conference Hall Scheduler (TypeScript)

#### Overview
This backend application provides an API for retrieving information about conference halls, branches, and associated properties. It allows clients to:
- Get a list of available branches.
- List halls in a branch.
- Retrieve specific details such as hall properties or the first hall in a branch.
- Get a Google Maps link for each branch.

The data is stored in a `halls.json` file, which is parsed at runtime to allow the API to serve the relevant information. The backend is built using **Express** and **TypeScript**.

---

### API Endpoints

#### 1. **Get Branches**
   - **URL**: `/api/Branches`
   - **Method**: `GET`
   - **Description**: Returns a list of all available branches.
   - **Response**:
     - **200 OK**: A JSON array of branch names.
     - **Example**:
       ```json
       ["BranchName1", "BranchName2"]
       ```

#### 2. **Get List of Halls in a Branch**
   - **URL**: `/api/Branches/:s/list_of_halls`
   - **Method**: `GET`
   - **Description**: Returns a list of halls in the specified branch.
   - **Parameters**:
     - `:s` (string) – The name of the branch.
   - **Response**:
     - **200 OK**: A JSON array of hall names.
     - **Example**:
       ```json
       ["HallName1", "HallName2"]
       ```
     - **400 Bad Request**: If the branch does not exist or the data is malformed.
     - **Example**:
       ```json
       {
         "error": "Invalid city name provided"
       }
       ```

#### 3. **Get the First Hall in a Branch**
   - **URL**: `/api/Branches/:s/first_hall`
   - **Method**: `GET`
   - **Description**: Returns the name of the first hall in the specified branch.
   - **Parameters**:
     - `:s` (string) – The name of the branch.
   - **Response**:
     - **200 OK**: The name of the first hall.
     - **Example**:
       ```json
       "HallName1"
       ```
     - **400 Bad Request**: If the branch does not exist or the data is malformed.
     - **Example**:
       ```json
       {
         "error": "Invalid city name provided"
       }
       ```

#### 4. **Get Google Maps Link for a Branch**
   - **URL**: `/api/Branches/:s/gmap_link`
   - **Method**: `GET`
   - **Description**: Returns the Google Maps link for the specified branch.
   - **Parameters**:
     - `:s` (string) – The name of the branch.
   - **Response**:
     - **200 OK**: A JSON string with the Google Maps link.
     - **Example**:
       ```json
       "http://googlemapslink"
       ```
     - **400 Bad Request**: If the branch does not exist or the data is malformed.
     - **Example**:
       ```json
       {
         "error": "Invalid city name provided"
       }
       ```

#### 5. **Get Hall Information for a Specific Hall**
   - **URL**: `/api/Branches/:s1/:s2/hall_info`
   - **Method**: `GET`
   - **Description**: Returns detailed information about a specific hall in a branch.
   - **Parameters**:
     - `:s1` (string) – The name of the branch.
     - `:s2` (string) – The name of the hall.
   - **Response**:
     - **200 OK**: A JSON object with the hall's properties.
     - **Example**:
       ```json
       {
         "Capacity": 100,
         "AC?": "Yes",
         "Area": 250
       }
       ```
     - **400 Bad Request**: If the branch or hall does not exist.
     - **Example**:
       ```json
       {
         "error": "Invalid city name provided"
       }
       ```

---