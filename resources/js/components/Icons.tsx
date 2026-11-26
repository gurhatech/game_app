export interface IconProps extends React.SVGProps<SVGSVGElement> {
    name : string,
}

const IconData: Record<string, React.ReactNode> = {
    home: (
        <>
            <path d="M32 3 C25 12 8 25 10 39 C12 53 25 58 32 49 C39 58 52 53 54 39 C56 25 39 12 32 3Z" />
        </>
    ),
    promo: (
        <>
            <path d="M8 9 H56 V55 H8 Z" />
            <path
                d="M18 21 L46 43"
                stroke="#990000"
                strokeWidth="5"
                fill="none"
            />
            <circle cx="22" cy="22" r="5" fill="#990000" />
            <circle cx="42" cy="42" r="5" fill="#990000" />
            <path d="M24 48 L40 16" stroke="#990000" strokeWidth="5" />
        </>
    ),
    earn: (
        <>
            <path
                d="M8 24 H56 V31 H8 Z
            M13 34 H51 V57 H13 Z
            M27 24 H37 V57 H27 Z"
            />
            <circle cx="20" cy="13" r="7" />
            <circle cx="44" cy="13" r="7" />
        </>
    ),
    mine: (
        <>
            <path
                d="M32 3 C19 17 9 27 9 39
            C9 54 19 61 32 61
            C45 61 55 54 55 39
            C55 27 45 17 32 3Z"
            />
            <path
                d="M18 39 Q32 50 46 39
            Q43 55 32 53 Q21 55 18 39Z"
                fill="#990000"
            />
        </>
    ),
};

const IconSvg: React.FC<IconProps> = ({
    name,
    ...props
}) => {
    return (
        <svg
            xmlns=""
            viewBox="0 0 64 64"
            {...props}
        >
            {IconData[name]}
        </svg>
    );
};

export default IconSvg;
