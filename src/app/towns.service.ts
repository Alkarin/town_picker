import { Injectable } from '@angular/core';
import { Subject} from 'rxjs/Subject';

@Injectable()
export class TownsService {
  activated = new Subject();

  constructor() { }

}
