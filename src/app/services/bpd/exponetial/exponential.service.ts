import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExponentialService {

  constructor() { }

  exponentialSmoothing(data: any, alpha: number, h: number, stdev: number, minData: number) {
    let forecast = data;
    // Loop through the data starting from the second observation
    for (let i = 1; i < data.length; i++) {
      // Calculate the next forecast using the exponential smoothing formula
      forecast[i] = alpha * data[i] + (1 - alpha) * forecast[i - 1];
    }

    // prediksi 2 jam kedepan
    for (let i = 0; i < h; i++) {
      // forecast.push(alpha * forecast[forecast.length - 1] + (1 - alpha) * forecast[forecast.length - 2]);
      forecast.push(minData + stdev);
    }

    return forecast;

  }

  calculateMean(data: number[]) {
    const sum = data.reduce((acc, value) => acc + value, 0);
    return sum / data.length;
  }

  calculateStandartDeviation(data: number[]) {
    const mean = this.calculateMean(data);
    const squaredDifferences = data.map(value => Math.pow(value - mean, 2));
    const variance = squaredDifferences.reduce((acc, value) => acc + value, 0) / data.length;

    return Math.sqrt(variance);
  }

  calculateAverage(data: number[]): number {
    const sum = data.reduce((acc, value) => acc + value, 0);
    return sum / data.length;
  }

}
