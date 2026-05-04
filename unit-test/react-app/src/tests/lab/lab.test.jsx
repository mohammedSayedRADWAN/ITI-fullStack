import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import Status from "./Status";
import HeroesFromAPI from "./Heroes";
import { server } from "../../mocks/server";
import { http, HttpResponse } from "msw";

describe("Status component", () => {
  it('should render "🔴 Offline" and the toggle button on initial render', () => {
    render(<Status />);
    expect(screen.getByText(/🔴 Offline/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /toggle status/i })).toBeInTheDocument();
  });

  it('should switch to "🟢 Online" when button is clicked once', async () => {
    render(<Status />);
    const button = screen.getByRole("button", { name: /toggle status/i });
    await userEvent.click(button);
    expect(screen.getByText(/🟢 Online/i)).toBeInTheDocument();
  });

  it('should switch back to "🔴 Offline" when button is clicked twice', async () => {
    render(<Status />);
    const button = screen.getByRole("button", { name: /toggle status/i });
    await userEvent.click(button);
    await userEvent.click(button);
    expect(screen.getByText(/🔴 Offline/i)).toBeInTheDocument();
  });
});

describe("HeroesFromAPI component", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should display "No heroes available" when API returns an empty list', async () => {
    server.use(
      http.get("http://localhost:3000/heroes", () => {
        return HttpResponse.json([], { status: 200 });
      })
    );
    
    render(<HeroesFromAPI />);
    
    expect(await screen.findByText(/No heroes available/i)).toBeInTheDocument();
  });

  it("should render a list of heroes after successful API fetch", async () => {
    const mockHeroes = [
      { id: 1, name: "Spider-Man", strength: 10 },
      { id: 2, name: "Iron Man", strength: 15 },
    ];
    
    server.use(
      http.get("http://localhost:3000/heroes", () => {
        return HttpResponse.json(mockHeroes, { status: 200 });
      })
    );
    
    render(<HeroesFromAPI />);
    
    expect(await screen.findByText(/Spider-Man/i)).toBeInTheDocument();
    expect(screen.getByText(/Iron Man/i)).toBeInTheDocument();
  });

  it("BONUS: should display an error message when API request fails with status 500", async () => {
    server.use(
      http.get("http://localhost:3000/heroes", () => {
        return new HttpResponse(null, { status: 500 });
      })
    );
    
    render(<HeroesFromAPI />);
    
    expect(await screen.findByText(/Failed to fetch heroes/i)).toBeInTheDocument();
  });
});