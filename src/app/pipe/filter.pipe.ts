import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resultPosts = [];
    let cont=0;
    for (const post of value) {
      cont++;
      if (post.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        if(cont<=5)
          resultPosts.push(post);
      };
    };
    return resultPosts;
  }

}
