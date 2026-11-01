import {
    describe,
    it,
    expect,
    vi,
    beforeEach
} from "vitest";

import {
    render,
    screen,
    fireEvent,
    waitFor,
    cleanup
} from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Login";
import api from "../services/api";

const mockedNavigate = vi.fn();

vi.mock("../services/api", () => ({
    default: {
        post: vi.fn()
    }
}));

vi.mock("../components/Navbar", () => ({
    default: () => <div>Navbar</div>
}));

vi.mock("../components/Footer", () => ({
    default: () => <div>Footer</div>
}));

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");

    return {
        ...actual,
        useNavigate: () => mockedNavigate
    };
});

describe("Student Login", () => {
    beforeEach(() => {
        cleanup();
        vi.clearAllMocks();
        sessionStorage.clear();
        vi.spyOn(window, "alert").mockImplementation(() => {});
    });

    it("logs in successfully and stores the token", async () => {
        api.post.mockResolvedValue({
            data: { token: "test-token" }
        });

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText("Enter Email"), {
            target: { value: "student@example.com" }
        });

        fireEvent.change(screen.getByPlaceholderText("Enter Password"), {
            target: { value: "password123" }
        });

        fireEvent.click(screen.getByRole("button", { name: "Login" }));

        await waitFor(() => {
            expect(api.post).toHaveBeenCalledWith("/auth/login", {
                email: "student@example.com",
                password: "password123"
            });

            expect(sessionStorage.getItem("token")).toBe("test-token");
            expect(mockedNavigate).toHaveBeenCalledWith("/dashboard");
            expect(window.alert).toHaveBeenCalledWith("Login successful!");
        });
    });

    it("shows an error when login fails", async () => {
        api.post.mockRejectedValue({
            response: {
                data: { message: "Invalid credentials" }
            }
        });

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText("Enter Email"), {
            target: { value: "wrong@example.com" }
        });

        fireEvent.change(screen.getByPlaceholderText("Enter Password"), {
            target: { value: "wrongpassword" }
        });

        fireEvent.click(screen.getByRole("button", { name: "Login" }));

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith("Invalid credentials");
        });
    });
});