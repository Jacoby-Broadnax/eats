// Tracking User Authentication Status Changes
auth.onAuthStateChanged((user) => {
    if (user) {
      db.collection("users").doc(user.uid).get().then(doc =>{
            //Account Info In INner HTML
            const html = `<div>Logged in as ${doc.data().FirstName} ${doc.data().LastName}</div>
            <div></div>
         `;
         const firstName = `${doc.data().FirstName}`;
         const lastName = `${doc.data().LastName}`;
         const email = `${user.email}`;
         const city = `${doc.data().City}`
      
         document.getElementById("firstName").innerHTML= firstName;
         document.getElementById("lastName").innerHTML = lastName;
           
          });
  
        var statusLog = "#account";
     
      //Toggling Menu Items
      document.getElementById("logout").style.display =
        "inline-block";
        
      console.log("welcome back");
    
      document.getElementById("account").style.display = "none";
      document.getElementById("popupLogin").style.display = "none";
      document.getElementById("post-menu-button").style.display = "inline-block";
      document.getElementById("profile-menu-button").style.display =
        "inline-block";
      // Get Data Only if Authenticated
      db.collection("Jobs").onSnapshot((snapshot) => {
        setupSearch(snapshot.docs);
      });
    } else {
      var statusLog = "#";
      document.getElementById("logout").style.display = "none";
      document.getElementById("account").style.display =
        "block";
      document.getElementById("login-menu-button").style.display = "inline-block";
      document.getElementById("post-menu-button").style.display = "none";
      document.getElementById("profile-menu-button").style.display = "none";
      document.getElementById("profile").style.display = "none";
      // Removing Account INfo from inner HTML
 
      setupSearch([]);
    }
  });
  

  
  // Sign up
  
  const signupForm = document.querySelector("#signup-form");
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    // get user info
    const email = signupForm["signup-email"].value;
    const password = signupForm["signup-password"].value;

    //sign up the user
  
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        // Creating an ID based on generated user id😁
        return db.collection("users").doc(cred.user.uid).set({
          FirstName: signupForm["signup-first-name"].value,
          LastName: signupForm["signup-last-name"].value,
          City:signupForm["signup-city"].value,
        });
        console.log(cred.user);
  
        //.then is important for creating an ID
      })
      .then(() => {
        //Closes Modal
        signupForm.reset();
        window.location.reload();
        document.getElementById("popupSignup").style.display="none";
        self.location.href = '#';
      });
  });
  
  // Log out
  
  const logout = document.querySelector("#logout");
  logout.addEventListener("click", (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
      console.log("user logged out");
    });
  });
  
//Sign In

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get user info

  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    console.log(cred.user);

    //close the login modal and reset form
    self.location.href = '#';
    loginForm.reset();
    document.getElementById("popupLogin").style.display = "none";
    document.getElementById("logout").style.display = "block";
  });
});
