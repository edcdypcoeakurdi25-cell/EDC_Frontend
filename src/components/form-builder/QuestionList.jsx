import { useState } from 'react';
import QuestionCard from './QuestionCard';
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core';
import { useOpeningBuilder } from '../../hooks/useOpeningBuilderContext';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';

export default function QuestionList() {
    const { questions, setQuestions } = useOpeningBuilder();

    const [activeId, setActiveId] = useState(null);
    const [dragWidth, setDragWidth] = useState(null);

    const activeQuestion = questions.find(q => q.id === activeId);

    const handleDragStart = event => {
        const { active } = event;

        setActiveId(active.id);

        const node = document.querySelector(`[data-id="${active.id}"]`);

        if (node) {
            setDragWidth(node.getBoundingClientRect().width);
        }
    };

    const handleDragEnd = event => {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            setActiveId(null);
            return;
        }

        const oldIndex = questions.findIndex(q => q.id === active.id);
        const newIndex = questions.findIndex(q => q.id === over.id);

        setQuestions(arrayMove(questions, oldIndex, newIndex));

        setActiveId(null);
    };

    return (
        <div>
            <h2 className="text-zinc-200 font-medium mb-6 text-sm">Custom Questions</h2>

            <DndContext
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={questions.map(q => q.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-3">
                        {questions.map(q => (
                            <QuestionCard key={q.id} question={q} />
                        ))}
                    </div>
                </SortableContext>

                {/* Floating drag card */}
                <DragOverlay>
                    {activeQuestion ? (
                        <div style={{ width: dragWidth }}>
                            <QuestionCard question={activeQuestion} overlay />
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
}
