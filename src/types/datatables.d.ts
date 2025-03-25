// types/datatables.d.ts
import * as $ from 'jquery';

declare global {
  interface JQuery {
    DataTable: any;
  }
}
