import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, ThumbsDown, ThumbsUp } from "lucide-react";

const Section = ({ id, title, subtitle, children }: { id: string, title: string, subtitle?: string, children: React.ReactNode }) => (
    <section id={id} className="mb-12 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
        {subtitle && <h3 className="text-xl text-gray-600 mb-6 font-medium">{subtitle}</h3>}
        <div className="space-y-4 text-gray-700 leading-relaxed prose prose-neutral max-w-none">
            {children}
        </div>
    </section>
);

export default function PersonalTermsPage() {
    return (
        <div>
            <div className="mb-10">
                <p className="text-sm font-semibold text-lime-600 mb-1">Terms & Policies</p>
                <h1 className="text-5xl font-bold tracking-tight text-gray-900">Personal Terms</h1>
                <p className="mt-2 text-gray-500">Last updated on September 15, 2023</p>
                <Button variant="outline" className="mt-6 bg-lime-500 text-lime-900 border-lime-600/20 hover:bg-lime-500/90 font-bold">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                </Button>
            </div>

            <article>
                <Section id="general" title="General" subtitle="Sed ut perspiciatis unde">
                    <p>Aliquam sanectus neque un id eget consectetur dictum. Donec posuere pharetra odio consequat scelerisque et, nunc tortor. Eget quis mi in, egestas in volutpat mattis at volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue enim. Quis at habitant diam at. Suscipit tristique risus, at donec. In turpis vel et quam imperdiet, ipsum molestie aliquet sodales id est ac volutpat.</p>
                    <ul>
                        <li><strong>Mi tincidunt elit</strong>, id quisque ligula ac diam, amet.</li>
                        <li><strong>Vel etiam suspendisse</strong> morbi eleifend faucibus eget vestibulum.</li>
                        <li><strong>Tellus aliquam enim urna</strong>, etiam. Mauris posuere imperdiet.</li>
                        <li><strong>At vero eos</strong> et accusamus et iusto odio</li>
                    </ul>
                    <p>Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque congue eget consectetur turpis. Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus.</p>
                </Section>
                
                <Section id="services" title="Paymint Services">
                    <ul>
                        <li><strong>Dolor anim eu</strong> tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam. Tempor integer aliquam in vitae malesuada fringilla.</li>
                        <li><strong>Elit nisi in eleifend sed nisi</strong>. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim dignissim adipiscing faucibus consequat urna. Vivamus purus et erat auctor aliquam. Risus, volutpat vulputate posuere purus sit congue convallis aliquet. Arcu id augue ut feugiat donec porttitor neque. Mauris, neque ultricies eu vestibulum, bibendum quam lorem id. Dolor lacus, eget nunc lectus in tellus, pharetra, porttitor.</li>
                        <li><strong>Ipsum sit mattis</strong> nulla quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque congue eget consectetur turpis. Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue felis elit ac sem nam nibh orci.</li>
                    </ul>
                </Section>

                <Section id="data" title="Customer Data">
                    <p>Sagittis at eu at elementum, quis in. Proin praesent volutpat egestas sociis sit lorem nunc nunc sit. Eget diam curabitur mi nec. Auctor rutrum lacus malesuada massa ornare at. Vulputate consectetur ac ultricies at diam dui eget fringilla tincidunt. Arcu a sit dignissim massa erat cursus vulputate gravida id. Sed quis auctor vulputate hac elementum gravida cursus dis.</p>
                    <ol>
                        <li>Lacus id duis vitae porttitor enim gravida morbi.</li>
                        <li>Eu turpis posuere semper feugiat volutpat elit, ultrices suspendisse. Auctor vel in vitae placerat.</li>
                        <li>Suspendisse maecenas ac donec scelerisque diam sed est duis purus.</li>
                    </ol>
                </Section>

                <Section id="security" title="Security">
                     <ul>
                        <li><strong>Dolor anim eu</strong> tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam. Tempor integer aliquam in vitae malesuada fringilla.</li>
                        <li><strong>Elit nisi in eleifend sed nisi</strong>. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim dignissim adipiscing faucibus consequat urna. Vivamus purus et erat auctor aliquam. Risus, volutpat vulputate posuere purus sit congue convallis aliquet.</li>
                        <li><strong>Ipsum sit mattis</strong> nulla quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque congue eget consectetur turpis. Sapien, dictum molestie sem tempor.</li>
                    </ul>
                </Section>

                 <Section id="communications" title="Communications">
                    <p>Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque congue eget consectetur turpis. Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus. Quis velit eget ut tortor tellus.</p>
                     <ul>
                        <li><strong>Morbi sed imperdiet</strong> in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ut. Duis est sit sed leo nisi, blandit elit sagittis. Quisque feugiat consequat quam sed.</li>
                        <li><strong>Nunc sed faucibus</strong> bibendum feugiat sed interdum. Ipsum egestas condimentum massa. In tincidunt pharetra consectetur sed duis facilisis metus. Etiam egestas in nec sed et. Quis lobortis an sit dictum eget nibh tortor commodo camus.</li>
                        <li><strong>Odio felis sagittis</strong>, morbi feugiat tortor vitae feugiat fusce aliquet. Nam sit mattis nulla quam enim mauris id. Non pellentesque congue eget consetetur turpis.</li>
                    </ul>
                </Section>

                <Section id="indemnification" title="Indemnification">
                    <p>Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit, tellus tincidunt. At feugiat sapien vitae varius id.</p>
                    <p>Eget quis mi enim, leo lacinia pharetra, semper. Egestas in volutpat mattis at volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue enim. Quis at habitant diam at donec. Suscipit tristique risus, at donec. In quam imperdiet. Ipsum molestie aliquet sodales id est ac volutpat.</p>
                </Section>

                <Section id="contact" title="How to contact us">
                     <p>If you have any questions about this Personal Terms, please contact us at <a href="mailto:info@paymint.com" className="text-lime-600 font-semibold">info@paymint.com</a>.</p>
                </Section>
            </article>

            <Card className="mt-16 bg-gray-50 border-gray-200">
                <CardContent className="p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="font-semibold text-gray-700">Was this article helpful?</p>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" className="bg-white"><ThumbsUp className="mr-2 h-4 w-4" /> Yes</Button>
                        <Button variant="outline" className="bg-white"><ThumbsDown className="mr-2 h-4 w-4" /> No</Button>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
