import { randomBytes } from 'crypto';

const getRandomExpressionKey = () => randomBytes(20).toString('hex');

export class Table<TableItem> {
    private readonly data: Record<string, TableItem> = {};
    constructor(private readonly dataFolder: string, private readonly tableName: string) {}

    private async saveData() {
        return null;
    }

    public async put(item: TableItem): Promise<string> {
        const key = getRandomExpressionKey();
        this.data[key] = item;
        await this.saveData();
        return key;
    }

    public async update(key: string, updates: Partial<TableItem>): Promise<void> {
        if (!(key in this.data)) {
            throw new Error("Tried to update item that doesn't exist");
        }
        this.data[key] = {
            ...this.data[key],
            ...updates,
        };
        await this.saveData();
    }

    public async delete(key: string): Promise<void> {
        delete this.data[key];
        await this.saveData();
    }

    public async get(key: string): Promise<TableItem | undefined> {
        return this.data[key];
    }

    public async scan(): Promise<TableItem[]> {
        return Object.values(this.data);
    }
}
