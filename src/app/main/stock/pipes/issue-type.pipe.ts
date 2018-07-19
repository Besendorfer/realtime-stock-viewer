import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'issueType'
})
export class IssueTypePipe implements PipeTransform {

  /**
   * ad – American Depository Receipt (ADR’s)
   * re – Real Estate Investment Trust (REIT’s)
   * ce – Closed end fund (Stock and Bond Fund)
   * si – Secondary Issue
   * lp – Limited Partnerships
   * cs – Common Stock
   * et – Exchange Traded Fund (ETF)
   * (blank) = Not Available, i.e., Warrant, Note, or (non-filing) Closed Ended Funds
   * @param value - the value to transform
   * @param args - additional arguments
   */
  transform(value: any, args?: any): any {
    switch (value) {
      case 'ad':
        return 'American Depository Receipt (ADR’s)';
      case 're':
        return 'Real Estate Investment Trust (REIT’s)';
      case 'ce':
        return 'Closed end fund (Stock and Bond Fund)';
      case 'si':
        return 'Secondary Issue';
      case 'lp':
        return 'Limited Partnerships';
      case 'cs':
        return 'Common Stock';
      case 'et':
        return 'Exchange Traded Fund (ETF)';
      default:
        return 'Not Available';
    }
  }

}









