import { Company } from '../../../services/iex/interfaces/company';
import { Quote } from '../../../services/iex/interfaces/quote';

export interface Stock {
  company: Company;
  quote: Quote;
}