/// <reference types="cypress" />
import { randPassword, randUser, randNumber } from "@ngneat/falso";

let user = randUser();
let userNewInfo = randUser();
let idCode = randNumber({ min: 1930, max: 9999, precision: 1 });

const API_ENDPOINT = Cypress.env("API_ENDPOINT");

describe("User Management", () => {
  it("Create User", () => {
    cy.api({
      method: "POST",
      url: `${Cypress.env("API_ENDPOINT")}/user`,
      body: {
        id: idCode,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.randPassword,
        phone: user.phone,
        userStatus: 0,
      },
    }).then((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body.message).to.be.equal(idCode.toString());
    });
  });

  it("Search User", () => {
    cy.api({
      method: "GET",
      url: `${Cypress.env("API_ENDPOINT")}/user/${user.username}`,
    }).then((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body.id).to.be.equal(idCode);
      expect(response.body.username).to.be.equal(user.username);
      expect(response.body.firstName).to.be.equal(user.firstName);
      expect(response.body.lastName).to.be.equal(user.lastName);
      expect(response.body.email).to.be.equal(user.email);
      expect(response.body.phone).to.be.equal(user.phone);
    });
  });

  it("Modify User", () => {
    cy.api({
      method: "PUT",
      url: `${Cypress.env("API_ENDPOINT")}/user/${user.username}`,
      body: {
        id: idCode,
        username: user.username,
        firstName: userNewInfo.firstName,
        lastName: userNewInfo.lastName,
        email: userNewInfo.email,
        password: user.randPassword,
        phone: user.phone,
        userStatus: 0,
      },
    }).then((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body.message).to.be.equal(idCode.toString());
    });
  });

  it("Search Modified User", () => {
    cy.api({
      method: "GET",
      url: `${Cypress.env("API_ENDPOINT")}/user/${user.username}`,
    }).then((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body.id).to.be.equal(idCode);
      expect(response.body.username).to.be.equal(user.username);
      expect(response.body.firstName).to.be.equal(userNewInfo.firstName);
      expect(response.body.lastName).to.be.equal(userNewInfo.lastName);
      expect(response.body.email).to.be.equal(userNewInfo.email);
      expect(response.body.phone).to.be.equal(user.phone);
    });
  });

  it("Delete User", () => {
    cy.api({
      method: "DELETE",
      url: `${Cypress.env("API_ENDPOINT")}/user/${user.username}`,
    }).then((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body.message).to.be.equal(user.username);
    });

    cy.api({
      method: "GET",
      failOnStatusCode: false,
      url: `${Cypress.env("API_ENDPOINT")}/user/${user.username}`,
    }).then((response) => {
      expect(response.status).to.be.equal(404);
      expect(response.body.message).to.be.equal("User not found");
    });
  });
});
