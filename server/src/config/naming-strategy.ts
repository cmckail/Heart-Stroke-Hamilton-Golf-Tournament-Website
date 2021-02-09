import { DefaultNamingStrategy } from "typeorm";
import { snakeCase } from "typeorm/util/StringUtils";

/**
 * Changes DB naming schemes to underscore case
 */
export default class NamingStrategy extends DefaultNamingStrategy {
    public tableName(className: string, customName: string): string {
        return customName || snakeCase(className);
    }

    public columnName(
        propertyName: string,
        customName: string,
        embeddedPrefixes: string[]
    ): string {
        return `${snakeCase(embeddedPrefixes.join("_"))}${
            customName || snakeCase(propertyName)
        }`;
    }

    public relationName(propertyName: string): string {
        return snakeCase(propertyName);
    }

    public joinColumnName(
        relationName: string,
        referencedColumnName: string
    ): string {
        return snakeCase(`${relationName}_${referencedColumnName}`);
    }

    public joinTableName(
        firstTableName: string,
        secondTableName: string,
        firstPropertyName: string
    ): string {
        return snakeCase(
            `${firstTableName}_${firstPropertyName.replace(
                /\./gi,
                "_"
            )}_${secondTableName}`
        );
    }

    public joinTableColumnName(
        tableName: string,
        propertyName: string,
        columnName?: string
    ): string {
        return snakeCase(`${tableName}_${columnName || propertyName}`);
    }

    public classTableInheritanceParentColumnName(
        parentTableName: any,
        parentTableIdPropertyName: any
    ): string {
        return snakeCase(`${parentTableName}_${parentTableIdPropertyName}`);
    }
}
