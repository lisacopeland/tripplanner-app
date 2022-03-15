
import { deepCopy } from '@tripplanner/common';

export class Trip {
  id: string;
  updated_at: string;
  created_at: string;
  account_id: string;
  admin_title: string;
  admin_status: string;
  admin_notes: string;

  constructor(defaultValues: Partial<Trip>) {
      Object.keys(defaultValues).forEach((key) => {
        this[key] = defaultValues[key];
      });
  }

  clone() {
    return new Trip(deepCopy(this));
  }
}

export function mapToTrip(data: any): Trip {
  return new Trip(data);
}
export function mapToTrips(data: unknown[]): Trip[] {
  if (data.length) {
    const allData = data.map(mapToTrip);
    return allData;
  } else {
    return [];
  }
}

