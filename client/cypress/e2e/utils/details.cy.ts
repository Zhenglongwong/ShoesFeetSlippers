export const addToCart = () => {
    return cy.findByRole("button", { name: "Add to Cart" });
};
export const viewCart = () => {
    return cy.findByRole("button", { name: "View Cart" });
};
export const quantityInput = () => {
    return cy.findByRole("spinbutton", { name: "Qty" });
};
export const closeCart = () => {
    return cy.findByRole("button", { name: "Close panel" });
};