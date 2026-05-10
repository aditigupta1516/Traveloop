// src/types/index.ts
import { User, Trip, Stop, Activity, BudgetItem, PackingItem, Notification, Role, TripStatus, ActivityCategory, BudgetCategory, CollaboratorRole, NotificationType } from "@prisma/client";

export type { Role, TripStatus, ActivityCategory, BudgetCategory, CollaboratorRole, NotificationType };

export type SafeUser = Omit<User, "password"> & {
  role: Role;
};

export type TripWithStops = Trip & {
  stops: (Stop & { activities: Activity[] })[];
  _count?: { stops: number; collaborators: number };
};

export type TripWithAll = Trip & {
  stops: (Stop & { activities: Activity[] })[];
  budgetItems: BudgetItem[];
  packingItems: PackingItem[];
  collaborators: { user: SafeUser; role: CollaboratorRole }[];
  user: SafeUser;
};

export type DashboardStats = {
  totalTrips: number;
  upcomingTrips: number;
  totalBudget: number;
  totalSpent: number;
  countriesVisited: number;
  citiesExplored: number;
};

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
  rating: number;
  avgCost: number;
  bestSeason: string;
  tags: string[];
  lat: number;
  lng: number;
  popularityScore: number;
}

export interface WeatherInfo {
  city: string;
  temp: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export interface BudgetSummary {
  total: number;
  spent: number;
  remaining: number;
  byCategory: { category: string; amount: number }[];
}

export interface ActivityItem {
  id: string;
  type: "trip_created" | "activity_added" | "collaborator_joined" | "journal_entry";
  message: string;
  timestamp: Date;
  tripId?: string;
  tripTitle?: string;
}
