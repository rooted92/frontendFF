// Login and GetLoggedInUserData will help account login for Admin, Driver and Dispatch

const Login = async (loginUser) => {
    const response = await fetch(`https://fleetfinderbackend.azurewebsites.net/User/Login`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginUser)
        });
    if (!response.ok) {
        const message = `An error has occured ${response.status}`;
        throw new Error(message);
    }
    const data = await response.json();
    console.log(data);
    return data;
    // const data = response.json();
    // console.log(data);
}

const GetLoggedInUserData = async (email) => {
    // waiting on email as route
    const response = await fetch(`https://fleetfinderbackend.azurewebsites.net/User/GetUserInfo/${email}`);
    const data = await response.json();
    console.log(data);
    return data;
}

// Functions to Create Accounts for Admin, Driver, and Dispatch

const CreateUserAccount = async (createdUser) => {
    const response = await fetch('https://fleetfinderbackend.azurewebsites.net/User/AddUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(createdUser)
    });
    if (!response.ok) {
        const message = `An Error has Occurred ${response.status}`;
        throw new Error(message);
    }
    let data = await response.text();
    console.log(data);
    return data;
}

const CreateOrganization = async (organizationName) => {
    const response = await fetch('https://fleetfinderbackend.azurewebsites.net/Organization/AddOrganization', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(organizationName)
    });
    if (!response.ok) {
        const message = `An Error has Occurred ${response.status}`;
        throw new Error(message);
    }
    let data = await response.json();
    console.log(data);
    return data.joinCode;
}

// SignUp Functions
const GetOrganizationByJoinCode = async (joinCode) => {
    const response = await fetch(`https://fleetfinderbackend.azurewebsites.net/Organization/GetOrganizationByJoinCode/${joinCode}`);
    if (!response.ok) {
        const message = `An Error has Occurred ${response.status}`;
        throw new Error(message);
    }
    let data = await response.json();
    console.log(data);
    return data;
}

// Functions for ADMIN & DISPATCHER accounts
const AddNewLocation = async (newYard, id) => {
    const response = await fetch(`https://fleetfinderbackend.azurewebsites.net/Yards/AddYard/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(newYard)
    });
    if (!response.ok) {
        const message = `An Error has Occurred ${response.status}`;
        throw new Error(message);
    }
    let data = await response.json();
    console.log(data);
    return data;
}

// Functions for DISPATCHER account

const GetAllYards = async (organizationID) => {
    const response = await fetch(`https://fleetfinderbackend.azurewebsites.net/Yards/GetAllYardsByOrganizationID/${organizationID}`);
    const data = await response.json();
    console.log(data);
    return data;
}

const GetAllTrailers = async (organizationID) => {
    const response = await fetch(`https://fleetfinderbackend.azurewebsites.net/Trailer/GetTrailersByOrganizationID/${organizationID}`);
    const data = await response.json();
    console.log(data);
    return data;
}

const GetTrailersByYardID = async (yardId) => {
    const response = await fetch(`https://fleetfinderbackend.azurewebsites.net/Trailer/GetTrailersByYardID/${yardId}`);
    const data = await response.json();
    console.log(data);
    return data;
}

const UpdatePasswaord = async (id, password) => {
    const response = await fetch(`https://fleetfinderbackend.azurewebsites.net/User/UpdateUserPassword/${id}/${password}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(password)
        });
    if (!response.ok) {
        const message = `An Error Has Occurred ${response.status}`;
        throw new Error(message);
    }
    const data = await response.json()
    console.log(data);
    return data;
}

const UpdateEmail = async (id, email) => {
    const response = await fetch(`https://fleetfinderbackend.azurewebsites.net/User/UpdateUserEmail/${id}/${email}`)
    const data = await response.json()
    console.log(data)
    return data;
}

const UpdateUser = async (userObject) => {
    const response = await fetch(`https://fleetfinderbackend.azurewebsites.net/User/UpdateUserInfo/`,
        {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(userObject)
        })
    if (!response.ok) {
        const message = `An Error has Occurred ${response.status}`;
        throw new Error(message);
    }
    const data = await response.json()
    // console.log(data);
    return data;
}
const GetLastYardUpdate = async (yardID) => {
    const response = await fetch(`https://fleetfinderbackend.azurewebsites.net/UpdateLog/GetLastYardUpdate/${yardID}`);
    const data = await response.json();
    return data;
}

const GetUserByID = async (userID) => {
    const response = await fetch(`https://fleetfinderbackend.azurewebsites.net/User/GetUserById/${userID}`)
    const data = await response.json();
    return data;
}

// Funtions for DRIVER account

const GetTrailerCountSubmissions = async (userID) => {
    const response = await fetch(`https://fleetfinderbackend.azurewebsites.net/UpdateLog/GetUpdatesByUserID/${userID}`);
    const data = await response.json();
    console.log(data);
    return data;
}

const AddTrailer = async (newTrailer, driverId) => {
    const response = await fetch(`https://fleetfinderbackend.azurewebsites.net/Trailer/AddTrailer/${driverId}`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(newTrailer)
    });
    if (!response.ok) {
        const message = `An Error has Occurred ${response.status}`;
        throw new Error(message);
    };
    const data = await response.json();
    // console.log(data);
    return data;
}

const DeleteUser = async (UserId) => {
    const response = await  fetch(`https://fleetfinderbackend.azurewebsites.net/User/DeleteUser/${UserId}`)
    const data = await response.json();
    console.log(data);
    return data;
}

export { Login, GetLoggedInUserData, CreateUserAccount, CreateOrganization, GetOrganizationByJoinCode, AddNewLocation, GetAllYards, GetAllTrailers, UpdateEmail, UpdatePasswaord, UpdateUser, AddTrailer, GetLastYardUpdate, GetTrailersByYardID, DeleteUser };
