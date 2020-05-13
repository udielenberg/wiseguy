export const highlightParagraph = (paragraph: string, wordsArray: string[]) => {
    try {
        const wordsRegEx = wordsArray.join("|");
        const regex = new RegExp(wordsRegEx, "gi");
        //@ts-ignore
        return paragraph.replace(
            regex,
            (str: string) => `<span class="highlight">${str}</span>`
        );
    } catch (err) {
        console.log(err);
        return "problematic string";
    }
};

export const paragraphCurrrentAndTotal = (combinations: any, combinationIndex: number, paragraphIndex: number) => {
    const total = combinations.flatMap(
        (combination: any) => Object.values(combination)[0]
    ).length;

    const paragraphsPerChunk = combinations.reduce((total: number[], combination: any) => {
        const totalCombination = Object.values(combination)[0] as any[];
        const t =
            totalCombination && totalCombination.length ? totalCombination.length : 0;
        total = [...total, t];
        return total;
    }, [] as number[]);

    const current = calculateCurrentParagraph(
        paragraphsPerChunk,
        combinationIndex,
        paragraphIndex
    );

    function calculateCurrentParagraph(
        totals: number[],
        combinationIndex: number,
        paragraphIndex: number
    ) {
        const sum = totals.slice(0, combinationIndex).reduce((a, b) => a + b, 0);
        return sum + paragraphIndex + 1;
    }

    return { current, total }
}