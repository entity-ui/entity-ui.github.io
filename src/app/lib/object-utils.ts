export module ObjectUtils {

  export function values(obj: any): any[] {
    const result: any[] = [];

    for (const curKey in obj) {
      const curValue = obj[curKey];
      result.push(curValue);
    }

    return result;
  }

}