import React from 'react';

interface ButtonProps {
	onClick: () => void;
	disabled?: boolean;
	children: React.ReactNode;
	variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({
	onClick,
	disabled = false,
	children,
	variant = 'primary',
}) => {
	const baseClasses =
		'px-8 py-3 font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed';

	const variantClasses = {
		primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
		secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
	};

	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`${baseClasses} ${variantClasses[variant]}`}
		>
			{children}
		</button>
	);
};

export default Button;
