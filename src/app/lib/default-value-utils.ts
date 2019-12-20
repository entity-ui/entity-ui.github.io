export module DefaultValueUtils {

  export function boolean(value: boolean, defaultValue: boolean): boolean {
    return (typeof value === 'boolean') ? value : defaultValue;
  }

}