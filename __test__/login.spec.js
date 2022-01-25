import UserController from "../controller/UserController";
import fire from "../controller/firebase";

describe("Test Login Feature", () => {
  
  // Test login scenarios:
  
  // Positive tests:
  // 1. Verified user
  // 2. Query verified user's profile
  
  // Negative Tests
  // 1. Invalid user  
  // 2. Verified user with wrong password
  // 3. Query invalid user's profile

  // Verified user = Has been verified and created user profile in the database
  const verifiedUser = {
    email: "erikna7@gmail.com",
    username: "erikna7",
    password: "passerikna7",
    wrongPassword: "1234",    
  }

  // Invalid user = Has been registerd but not verified, no user profile in the database
  const invalidUser = {
    email: "adastra@gmail.com",
    username: "adastra",
    password: "invalid",
  }

  // Positive Tests:

  // 1. Verified user
  it("Email response should be same with verifiedUser.email ", async () => {
    const { user } = await UserController.logIn(verifiedUser.email, verifiedUser.password);
    expect(user.email).toBe((verifiedUser.email));
  });

  // 2. Query verified user's profile
  it("Query and Compare known user's profile", async () => {
    fire.database().ref("users/" + verifiedUser.username).once("value", (snapshot) => {
      const profile = snapshot.val()
      expect(profile.username).toBe(verifiedUser.username)
      expect(profile.email).toBe(verifiedUser.email)
    });
  });

  // Negative Tests:

  // 1. Invalid user
  it("Email response should be same with unverifiedUser.email ", async () => {
    try {
      await UserController.logIn(invalidUser.email, invalidUser.password);
    } catch (err) {
      expect(err.message).toBe(
        "There is no user record corresponding to this identifier. The user may have been deleted."
      )
    }    
  });
  
  // 2. Verified user with wrong password
  it("Login with invalid password", async () => {
    try {
      await UserController.logIn(verifiedUser.email, verifiedUser.wrongPassword);
    } catch (err) {
      expect(err.message).toBe(
        "The password is invalid or the user does not have a password."
      )
    }
  });

  // 3. Query invalid user's profile
  it("Query invalid user's profile", async () => {
    fire.database().ref("users/" + invalidUser.username).once("value", (snapshot) => {
      data = snapshot.val()
      expect(data).toBe(undefined)
    });
  });
});
