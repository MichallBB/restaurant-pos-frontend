import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "twoDecimal",
    standalone: true
})
export class twoDecimalPipe implements PipeTransform {
    transform(value: number): string {
        return value.toFixed(2);
    }
}