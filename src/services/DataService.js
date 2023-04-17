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
const AddNewLocation = async (newYard) => {
    const response = await fetch(`https://fleetfinderbackend.azurewebsites.net/Yards/AddYard`, {
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



// Funtions for DRIVER account



export { Login, GetLoggedInUserData, CreateUserAccount, GetOrganizationByJoinCode, AddNewLocation };