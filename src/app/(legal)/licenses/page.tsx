
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";

const licenses = [
    { name: 'React', url: 'https://github.com/facebook/react', license: 'MIT License' },
    { name: 'Next.js', url: 'https://github.com/vercel/next.js', license: 'MIT License' },
    { name: 'Tailwind CSS', url: 'https://github.com/tailwindlabs/tailwindcss', license: 'MIT License' },
    { name: 'Lucide', url: 'https://github.com/lucide-icons/lucide', license: 'ISC License' },
    { name: 'Shadcn/ui', url: 'https://github.com/shadcn/ui', license: 'MIT License' },
    { name: 'Firebase', url: 'https://github.com/firebase/firebase-js-sdk', license: 'Apache License 2.0' },
    { name: 'Genkit', url: 'https://github.com/firebase/genkit', license: 'Apache License 2.0' },
];

export default function LicensesPage() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm font-semibold text-lime-600 mb-1">Terms & Policies</p>
        <h1 className="text-5xl font-bold tracking-tight text-gray-900">Third-Party Licenses</h1>
        <p className="mt-2 text-gray-500">Paymint is built with amazing open-source software.</p>
      </div>
      <article className="space-y-4 text-gray-700 leading-relaxed prose prose-neutral max-w-none">
        <p>We are grateful to the developers and communities behind these projects for their contributions. Below is a list of the open-source software we use and their respective licenses.</p>
        
        <Card>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {licenses.map(lib => (
                                <tr key={lib.name}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <a href={lib.url} target="_blank" rel="noopener noreferrer" className="text-lime-600 hover:underline">{lib.name}</a>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lib.license}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
      </article>
    </div>
  );
}
