import Image from 'next/image';
import { CiTrash } from 'react-icons/ci';

export default function Todo({ changeTodo, isCompletedTask, deleteTask }: any) {

    return (
        <div className="flex flex-col pt-12">
            <ul className="flex flex-col ml-6 max-[420px]:ml-0">
                {changeTodo.map((todo: any) => {
                    return (
                        <li key={todo.id}
                            className={`flex items-center justify-between cursor-pointer pt-6 first:pt-0`}
                        >
                            <div className='flex items-center' onClick={() => isCompletedTask(todo.id)}>
                                <div className={`${todo.isCompleted ? 'bg-cyan-400' : ''} rounded-full border border-cyan-400 w-8 h-8 mr-4 relative`}>
                                    <Image
                                        className={'absolute top-1.5 left-1.5'} 
                                        src="/ok.svg"
                                        width={16}
                                        height={16}
                                        alt="ok"/>
                                </div>
                                <span className={`${todo.isCompleted ? 'line-through': ''} hover:text-blue-600 break-words`}>{todo.name}</span>
                            </div>
                            <CiTrash className={'trash-icon'} onClick={() => deleteTask(todo.id)} />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

