export interface UseCase {
    execute(body: any): Promise<any>;
}