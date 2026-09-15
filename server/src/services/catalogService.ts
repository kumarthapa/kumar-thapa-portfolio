import { catalog } from "../data/catalog.js";
export function getServices() {
  return catalog;
}
export function findService(id: string) {
  return catalog.find((service) => service.id === id);
}
