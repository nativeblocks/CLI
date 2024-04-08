function generateDataClassFromProperties(jsonArray: any[], packageName: string, className: string): string {
    let classDefinition = `package ${packageName}\n\n`;
    classDefinition += `data class ${className} (\n`;
  
    for (const jsonObj of jsonArray) {
      for (const key in jsonObj) {
        if (Object.prototype.hasOwnProperty.call(jsonObj, key)) {
          const type = kotlinTypeMapper(jsonObj["type"]);
          classDefinition += `    val ${key}: ${type},\n`;
        }
      }
    }
  
    classDefinition += ')';
    return classDefinition;
  }

function generateDataClassForEvents(jsonArray: any[], packageName: string, className: string): string {
    let classDefinition = `package ${packageName}\n\n`;
    classDefinition += `data class ${className} (\n`;
  
    for (const jsonObj of jsonArray) {
      const eventName = jsonObj["event"];
      classDefinition += `    val ${eventName}: () -> Unit,\n`;
    }
  
    classDefinition += ')';
    return classDefinition;
  }

function generateDataClassForData(jsonArray: any[], packageName: string, className: string): string {
    let classDefinition = `package ${packageName}\n\n`;
    classDefinition += `data class ${className} (\n`;
  
    for (const jsonObj of jsonArray) {
      const key = jsonObj["key"];
      const type = kotlinTypeMapper(jsonObj["type"]);
      classDefinition += `    val ${key}: ${type},\n`;
    }
  
    classDefinition += ')';
    return classDefinition;
  }
  
function toPascalCase(text: string) {
  const words = text.replace(/[^a-zA-Z0-9\s]/g, "").split(/\s+/);
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return capitalizedWords.join("");
}

function kotlinTypeMapper(type: string) {
    switch (type) {
      case "STRING":
        return "String";
      case "INT":
        return "Int";
      case "LONG":
        return "Long";
      case "DOUBLE":
        return "Double";
      case "FLOAT":
        return "Float";
      case "BOOLEAN":
        return "Boolean";
      default:
        return "Any";
    }
  }

  export {
    generateDataClassForData,
    generateDataClassFromProperties,
    generateDataClassForEvents,
    toPascalCase
  }