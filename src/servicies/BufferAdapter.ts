import { MachineRepository } from "repository/machineRepository"


export class BufferAdapter{

    public updateStatus(message: Buffer){
        const values: Map<String, String> = this.bufferToStringMap(message);

        const newStatus: number = Number(values.get('status'));
        if (isNaN(newStatus)) throw Error('wrong message send by mqtt')

        const id: String  | undefined = values.get('id');
        if (id === undefined) throw Error('wrong message send by mqtt, id missing')
        MachineRepository.modifyMachineStatus(id, newStatus)
    }

    public updateStock(message: Buffer){
        const values: Map<String, String> = this.bufferToStringMap(message);

        const newAmount: number = Number(values.get('amount'));
        if (isNaN(newAmount)) throw Error('wrong message send by mqtt')

        const id: String  | undefined = values.get('id');
        if (id === undefined) throw Error('wrong message send by mqtt, id missing')
        MachineRepository.modifyMachineStock(id, newAmount)
    }

    private bufferToStringMap(message: Buffer): Map<String, String> {
        const map: Map<String, String> = new Map()
        const values = message.toString().split(' ')
        if (values.length % 2 != 0) throw new Error('not same amount of keys and values')
        for (let i = 0; i < values.length; i=i+2) 
            map.set(values[i], values[i+1])
        return map;
    }
}