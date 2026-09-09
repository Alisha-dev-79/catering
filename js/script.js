document.addEventListener("DOMContentLoaded", function () {

    const bookingForm = document.getElementById("bookingForm");

    if (bookingForm) {

        bookingForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const eventType = document.getElementById("event").value;
            const date = document.getElementById("date").value;
            const guests = document.getElementById("guests").value;
            const packageType = document.getElementById("package").value;

            if (
                name === "" ||
                email === "" ||
                phone === "" ||
                eventType === "" ||
                date === "" ||
                guests === "" ||
                packageType === ""
            ) {
                alert("Please fill all required fields.");
                return;
            }

            localStorage.setItem("customerName", name);
            localStorage.setItem("customerEmail", email);
            localStorage.setItem("customerPhone", phone);
            localStorage.setItem("eventType", eventType);
            localStorage.setItem("eventDate", date);
            localStorage.setItem("guests", guests);
            localStorage.setItem("packageType", packageType);

            window.location.href = "payment.html";
        });
    }


    const paymentForm = document.getElementById("paymentForm");

    if (paymentForm) {

        paymentForm.addEventListener("submit", function (event) {

            event.preventDefault();

            localStorage.setItem("paymentStatus", "Paid");

            window.location.href = "confirmation.html";
        });
    }


    const customerName = localStorage.getItem("customerName");
    const customerEmail = localStorage.getItem("customerEmail");
    const eventType = localStorage.getItem("eventType");
    const eventDate = localStorage.getItem("eventDate");
    const guests = localStorage.getItem("guests");
    const packageType = localStorage.getItem("packageType");
    const paymentStatus = localStorage.getItem("paymentStatus");


    const confirmationName = document.getElementById("confirmationName");

    if (confirmationName && customerName) {
        confirmationName.textContent = customerName;
    }


    const confirmationEmail = document.getElementById("confirmationEmail");

    if (confirmationEmail && customerEmail) {
        confirmationEmail.textContent = customerEmail;
    }


    const confirmationEvent = document.getElementById("confirmationEvent");

    if (confirmationEvent && eventType) {
        confirmationEvent.textContent = eventType;
    }


    const confirmationDate = document.getElementById("confirmationDate");

    if (confirmationDate && eventDate) {
        confirmationDate.textContent = eventDate;
    }


    const confirmationGuests = document.getElementById("confirmationGuests");

    if (confirmationGuests && guests) {
        confirmationGuests.textContent = guests;
    }


    const confirmationPackage = document.getElementById("confirmationPackage");

    if (confirmationPackage && packageType) {
        confirmationPackage.textContent = packageType;
    }


    const confirmationPayment = document.getElementById("confirmationPayment");

    if (confirmationPayment && paymentStatus) {
        confirmationPayment.textContent = paymentStatus;
    }

});
const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const phone = document.getElementById("signupPhone").value.trim();
        const password = document.getElementById("signupPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const message = document.getElementById("signupMessage");

        if (password !== confirmPassword) {
            message.textContent = "Passwords do not match.";
            return;
        }

        localStorage.setItem("customerName", name);
        localStorage.setItem("customerEmail", email);
        localStorage.setItem("customerPhone", phone);
        localStorage.setItem("customerPassword", password);

        message.textContent = "Account created successfully!";

        signupForm.reset();

        setTimeout(function() {
            window.location.href = "login.html";
        }, 1500);
    });
}
const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;
        const message = document.getElementById("loginMessage");

        const savedEmail = localStorage.getItem("customerEmail");
        const savedPassword = localStorage.getItem("customerPassword");

        if (email === savedEmail && password === savedPassword) {

            localStorage.setItem("loggedIn", "true");

            message.textContent = "Login successful!";

            setTimeout(function() {
                window.location.href = "index.html";
            }, 1000);

        } else {

            message.textContent =
                "Invalid email or password.";

        }

    });
}
const bookingName = document.getElementById("bookingName");

if (bookingName) {

    const savedName = localStorage.getItem("customerName");
    const savedEvent = localStorage.getItem("eventType");
    const savedDate = localStorage.getItem("eventDate");
    const savedGuests = localStorage.getItem("guests");
    const savedPackage = localStorage.getItem("packageType");
    const savedPayment = localStorage.getItem("paymentStatus");

    if (savedName) {
        bookingName.textContent = savedName;
    }

    if (savedEvent) {
        document.getElementById("bookingEvent").textContent = savedEvent;
    }

    if (savedDate) {
        document.getElementById("bookingDate").textContent = savedDate;
    }

    if (savedGuests) {
        document.getElementById("bookingGuests").textContent = savedGuests;
    }

    if (savedPackage) {
        document.getElementById("bookingPackage").textContent = savedPackage;
    }

    if (savedPayment) {
        document.getElementById("bookingPayment").textContent = savedPayment;
    }
}
const adminLoginForm = document.getElementById("adminLoginForm");

if (adminLoginForm) {

    adminLoginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const username = document.getElementById("adminUsername").value.trim();
        const password = document.getElementById("adminPassword").value;
        const message = document.getElementById("adminLoginMessage");

        if (username === "admin" && password === "admin123") {

            localStorage.setItem("adminLoggedIn", "true");

            message.textContent = "Admin login successful!";

            setTimeout(function() {
                window.location.href = "admin-dashboard.html";
            }, 1000);

        } else {

            message.textContent = "Invalid username or password.";

        }

    });
}
const adminBookingTable = document.getElementById("adminBookingTable");

if (adminBookingTable) {

    const name = localStorage.getItem("customerName");
    const eventType = localStorage.getItem("eventType");
    const date = localStorage.getItem("eventDate");
    const guests = localStorage.getItem("guests");
    const packageType = localStorage.getItem("packageType");
    const payment = localStorage.getItem("paymentStatus") || "Pending";
    const status = localStorage.getItem("bookingStatus") || "Confirmed";

    if (name) {

        adminBookingTable.innerHTML = `
            <tr>
                <td>#CMS001</td>
                <td>${name}</td>
                <td>${eventType}</td>
                <td>${date}</td>
                <td>${guests}</td>
                <td>${packageType}</td>
                <td>${payment}</td>
                <td>
                    <span class="status ${status.toLowerCase()}">
                        ${status}
                    </span>
                </td>
            </tr>
        `;

    } else {

        adminBookingTable.innerHTML = `
            <tr>
                <td colspan="8">
                    No bookings found.
                </td>
            </tr>
        `;

    }
}
const addMenuBtn = document.getElementById("addMenuBtn");
const menuTable = document.getElementById("menuTable");

if (addMenuBtn && menuTable) {

    addMenuBtn.addEventListener("click", function () {

        const itemName = prompt("Enter menu item name:");
        const category = prompt("Enter category:");
        const price = prompt("Enter price:");

        if (!itemName || !category || !price) {
            return;
        }

        const rowCount = menuTable.rows.length + 1;
        const itemId = "#MENU00" + rowCount;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${itemId}</td>
            <td>${itemName}</td>
            <td>${category}</td>
            <td>₹${price}</td>
            <td>
                <span class="status confirmed">
                    Available
                </span>
            </td>
            <td>
                <button class="action-btn edit-btn">Edit</button>
                <button class="action-btn delete-btn">Delete</button>
            </td>
        `;

        menuTable.appendChild(row);
    });

    menuTable.addEventListener("click", function (event) {

        if (event.target.classList.contains("delete-btn")) {

            const row = event.target.closest("tr");

            if (confirm("Are you sure you want to delete this item?")) {
                row.remove();
            }
        }

        if (event.target.classList.contains("edit-btn")) {

            const row = event.target.closest("tr");

            const currentName = row.cells[1].textContent;
            const currentCategory = row.cells[2].textContent;
            const currentPrice = row.cells[3].textContent.replace("₹", "");

            const newName = prompt("Enter item name:", currentName);
            const newCategory = prompt("Enter category:", currentCategory);
            const newPrice = prompt("Enter price:", currentPrice);

            if (newName && newCategory && newPrice) {
                row.cells[1].textContent = newName;
                row.cells[2].textContent = newCategory;
                row.cells[3].textContent = "₹" + newPrice;
            }
        }
    });
}
const addPackageBtn = document.getElementById("addPackageBtn");
const packageTable = document.getElementById("packageTable");

if (addPackageBtn && packageTable) {

    addPackageBtn.addEventListener("click", function () {

        const packageName = prompt("Enter package name:");
        const category = prompt("Enter category:");
        const price = prompt("Enter price:");
        const guests = prompt("Enter number of guests:");

        if (!packageName || !category || !price || !guests) {
            return;
        }

        const packageId = "#PKG00" + (packageTable.rows.length + 1);

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${packageId}</td>
            <td>${packageName}</td>
            <td>${category}</td>
            <td>₹${price}</td>
            <td>${guests}</td>
            <td>
                <span class="status confirmed">
                    Available
                </span>
            </td>
            <td>
                <button class="action-btn edit-package">Edit</button>
                <button class="action-btn delete-btn">Delete</button>
            </td>
        `;

        packageTable.appendChild(row);
    });

    packageTable.addEventListener("click", function (event) {

        if (event.target.classList.contains("delete-btn")) {

            const row = event.target.closest("tr");

            if (confirm("Are you sure you want to delete this package?")) {
                row.remove();
            }
        }

        if (event.target.classList.contains("edit-package")) {

            const row = event.target.closest("tr");

            const oldName = row.cells[1].textContent;
            const oldCategory = row.cells[2].textContent;
            const oldPrice = row.cells[3].textContent.replace("₹", "");
            const oldGuests = row.cells[4].textContent;

            const newName = prompt("Enter package name:", oldName);
            const newCategory = prompt("Enter category:", oldCategory);
            const newPrice = prompt("Enter price:", oldPrice);
            const newGuests = prompt("Enter guests:", oldGuests);

            if (newName && newCategory && newPrice && newGuests) {
                row.cells[1].textContent = newName;
                row.cells[2].textContent = newCategory;
                row.cells[3].textContent = "₹" + newPrice;
                row.cells[4].textContent = newGuests;
            }
        }
    });
}
const addServiceBtn = document.getElementById("addServiceBtn");
const serviceTable = document.getElementById("serviceTable");

if (addServiceBtn && serviceTable) {

    addServiceBtn.addEventListener("click", function () {

        const serviceName = prompt("Enter service name:");
        const description = prompt("Enter service description:");
        const price = prompt("Enter service price:");

        if (!serviceName || !description || !price) {
            return;
        }

        const serviceId = "#SRV00" + (serviceTable.rows.length + 1);

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${serviceId}</td>
            <td>${serviceName}</td>
            <td>${description}</td>
            <td>₹${price}</td>
            <td>
                <span class="status confirmed">
                    Available
                </span>
            </td>
            <td>
                <button class="action-btn edit-service">
                    Edit
                </button>
                <button class="action-btn delete-btn">
                    Delete
                </button>
            </td>
        `;

        serviceTable.appendChild(row);
    });

    serviceTable.addEventListener("click", function (event) {

        if (event.target.classList.contains("delete-btn")) {

            const row = event.target.closest("tr");

            if (confirm("Are you sure you want to delete this service?")) {
                row.remove();
            }
        }

        if (event.target.classList.contains("edit-service")) {

            const row = event.target.closest("tr");

            const oldName = row.cells[1].textContent;
            const oldDescription = row.cells[2].textContent;
            const oldPrice = row.cells[3].textContent.replace("₹", "");

            const newName = prompt("Enter service name:", oldName);
            const newDescription = prompt(
                "Enter service description:",
                oldDescription
            );
            const newPrice = prompt("Enter service price:", oldPrice);

            if (newName && newDescription && newPrice) {
                row.cells[1].textContent = newName;
                row.cells[2].textContent = newDescription;
                row.cells[3].textContent = "₹" + newPrice;
            }
        }
    });
}
document.addEventListener("DOMContentLoaded", function () {

    const menuCards = document.querySelectorAll(".menu-card");

    menuCards.forEach(function (card) {

        const price = Number(card.getAttribute("data-price"));
        const quantity = card.querySelector(".quantity");
        const total = card.querySelector(".item-total");
        const plus = card.querySelector(".plus");
        const minus = card.querySelector(".minus");
        const orderBtn = card.querySelector(".order-btn");

        if (!price || !quantity || !total || !plus || !minus) {
            return;
        }

        plus.addEventListener("click", function () {
            let qty = Number(quantity.textContent);
            qty = qty + 1;

            quantity.textContent = qty;
            total.textContent = "Total: ₹" + (price * qty);
        });

        minus.addEventListener("click", function () {
            let qty = Number(quantity.textContent);

            if (qty > 1) {
                qty = qty - 1;

                quantity.textContent = qty;
                total.textContent = "Total: ₹" + (price * qty);
            }
        });

        if (orderBtn) {
            orderBtn.addEventListener("click", function () {

                const qty = Number(quantity.textContent);
                const itemName = card.querySelector("h3").textContent;

                localStorage.setItem("selectedMenuItem", itemName);
                localStorage.setItem("menuQuantity", qty);
                localStorage.setItem("menuTotal", price * qty);

            });
        }

    });

});