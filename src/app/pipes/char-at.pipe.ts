import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "charAt",
    standalone: true
})
export class CharAtPipe implements PipeTransform {
    transform(value: string, index: number): string {
        return value.charAt(index);
    }
}